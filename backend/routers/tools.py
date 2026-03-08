"""
/tools — file upload + PDF/Image conversion endpoints.
"""

import uuid

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from auth import get_current_user
from db import get_db
from models import Conversion, ConversionOut, UserProfile
from services import r2_service, pdf_service, image_service

router = APIRouter()


# ── 1. Upload file to R2 ──────────────────────────────────────────────────────

@router.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user),
):
    uid = current_user["uid"]
    key, url = await r2_service.upload_file(file, uid, prefix="inputs")
    return {
        "r2_key": key,
        "r2_url": url,
        "file_name": file.filename,
        "file_size": file.size or 0,
    }


# ── 2. Helpers ────────────────────────────────────────────────────────────────

PDF_EXT_MAP = {
    "pdf-to-word": "docx", "word-to-pdf": "pdf", "excel-to-pdf": "pdf",
    "powerpoint-to-pdf": "pdf", "pdf-merge": "pdf", "pdf-split": "pdf",
    "pdf-compress": "pdf", "image-to-pdf": "pdf", "pdf-to-image": "jpg",
    "password-protect": "pdf", "unlock-pdf": "pdf",
}

IMAGE_SLUGS = set(image_service.IMAGE_SLUG_MAP.keys())
MULTI_FILE_IMAGE_SLUGS = {"merge-photo-sign", "add-watermark-image"}


async def _ensure_profile(db, uid, user):
    result = await db.execute(select(UserProfile).where(UserProfile.uid == uid))
    profile = result.scalar_one_or_none()
    if not profile:
        profile = UserProfile(uid=uid, email=user.get("email", ""), full_name=user.get("name"))
        db.add(profile)
        await db.flush()


async def _save_conversion(db, uid, slug, label, file_name, file_size, input_key, input_url) -> Conversion:
    conv = Conversion(
        uid=uid, tool_slug=slug, tool_label=label,
        file_name=file_name, file_size=file_size,
        input_r2_key=input_key, input_r2_url=input_url,
        status="processing",
    )
    db.add(conv)
    await db.flush()
    return conv


# ── 3. Single-file convert ────────────────────────────────────────────────────

@router.post("/{slug}/convert", response_model=ConversionOut)
async def convert_file(
    slug: str,
    file: UploadFile = File(...),
    tool_label: str = Form(...),
    # PDF-specific params
    password: str = Form(default=""),
    owner_password: str = Form(default=""),
    pages_per_chunk: int = Form(default=1),
    # Image-specific params
    width: int = Form(default=0),
    height: int = Form(default=0),
    quality: int = Form(default=75),
    scale: int = Form(default=2),
    watermark_text: str = Form(default=""),
    position: str = Form(default="center"),
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    uid = current_user["uid"]
    await _ensure_profile(db, uid, current_user)

    input_key, input_url = await r2_service.upload_file(file, uid, prefix="inputs")
    await file.seek(0)
    file_data = await file.read()

    conv = await _save_conversion(
        db, uid, slug, tool_label, file.filename or "file",
        len(file_data), input_key, input_url,
    )

    try:
        output_data: bytes

        # ── PDF tools ────────────────────────────────────────────────────────
        if slug == "pdf-merge":
            raise HTTPException(400, "Merge requires multiple files — use /tools/pdf-merge/merge")
        elif slug == "pdf-split":
            chunks = pdf_service.split_pdf(file_data, pages_per_chunk)
            output_data = chunks[0] if chunks else file_data
        elif slug == "pdf-to-image":
            images = pdf_service.pdf_to_images(file_data)
            output_data = images[0] if images else b""
        elif slug == "password-protect":
            output_data = pdf_service.protect_pdf(file_data, owner_password or "owner", password)
        elif slug in pdf_service.SLUG_MAP and pdf_service.SLUG_MAP[slug]:
            output_data = pdf_service.SLUG_MAP[slug](file_data, {"password": password})

        # ── Image tools ───────────────────────────────────────────────────────
        elif slug == "image-resize":
            output_data = image_service.resize_image(
                file_data,
                width=width or None,
                height=height or None,
            )
        elif slug == "image-upscale":
            output_data = image_service.upscale_image(file_data, scale=max(1, scale))
        elif slug == "image-to-ico":
            output_data = image_service.image_to_ico(file_data)
        elif slug == "image-to-svg":
            output_data = image_service.image_to_svg(file_data)
        elif slug == "compress-image":
            output_data = image_service.compress_image(file_data, quality=quality)
        elif slug == "remove-background":
            output_data = image_service.remove_background(file_data)
        elif slug == "add-watermark-image":
            output_data = image_service.add_watermark(
                file_data,
                text=watermark_text or "Viadocs",
                position=position,
            )

        else:
            raise HTTPException(400, f"Unknown tool slug: {slug}")

        out_ext = (
            PDF_EXT_MAP.get(slug)
            or image_service.IMAGE_EXT_MAP.get(slug, "png")
        )
        out_name = (file.filename or "file").rsplit(".", 1)[0] + f"_converted.{out_ext}"
        out_key = f"outputs/{uid}/{uuid.uuid4().hex}.{out_ext}"
        out_url = r2_service.upload_bytes(output_data, out_key)

        conv.output_r2_key = out_key
        conv.output_r2_url = out_url
        conv.status = "completed"

    except HTTPException:
        raise
    except Exception as e:
        conv.status = "failed"
        conv.error_message = str(e)
        raise HTTPException(status_code=500, detail=f"Conversion failed: {e}")

    await db.flush()
    return conv


# ── 4. Merge Photo & Signature (two files) ────────────────────────────────────

@router.post("/merge-photo-sign/convert", response_model=ConversionOut)
async def merge_photo_sign(
    base_image: UploadFile = File(...),
    signature: UploadFile = File(...),
    position: str = Form(default="bottom-right"),
    scale: float = Form(default=0.25),
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    uid = current_user["uid"]
    await _ensure_profile(db, uid, current_user)

    base_data = await base_image.read()
    sig_data = await signature.read()

    output_data = image_service.merge_photo_and_signature(
        base_data, sig_data, position=position, scale=scale
    )

    out_key = f"outputs/{uid}/{uuid.uuid4().hex}.png"
    out_url = r2_service.upload_bytes(output_data, out_key)

    input_key, input_url = f"inputs/{uid}/{uuid.uuid4().hex}.png", ""

    conv = Conversion(
        uid=uid, tool_slug="merge-photo-sign", tool_label="Merge Photo & Sign",
        file_name=base_image.filename or "photo.png", file_size=len(base_data),
        input_r2_key=input_key, input_r2_url=input_url,
        output_r2_key=out_key, output_r2_url=out_url,
        status="completed",
    )
    db.add(conv)
    await db.flush()
    return conv


# ── 5. PDF Merge (multiple files) ─────────────────────────────────────────────

@router.post("/pdf-merge/merge", response_model=ConversionOut)
async def merge_pdfs(
    files: list[UploadFile] = File(...),
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    uid = current_user["uid"]
    pdfs = [await f.read() for f in files]
    merged = pdf_service.merge_pdfs(pdfs)

    out_key = f"outputs/{uid}/{uuid.uuid4().hex}.pdf"
    out_url = r2_service.upload_bytes(merged, out_key)

    conv = Conversion(
        uid=uid, tool_slug="pdf-merge", tool_label="Merge PDF",
        file_name="merged.pdf", file_size=len(merged),
        input_r2_key="", input_r2_url="",
        output_r2_key=out_key, output_r2_url=out_url,
        status="completed",
    )
    db.add(conv)
    await db.flush()
    return conv


# ── 6. Get a conversion record ────────────────────────────────────────────────

@router.get("/conversion/{conversion_id}", response_model=ConversionOut)
async def get_conversion(
    conversion_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    result = await db.execute(
        select(Conversion).where(
            Conversion.id == conversion_id,
            Conversion.uid == current_user["uid"],
        )
    )
    conv = result.scalar_one_or_none()
    if not conv:
        raise HTTPException(status_code=404, detail="Conversion not found")
    return conv
