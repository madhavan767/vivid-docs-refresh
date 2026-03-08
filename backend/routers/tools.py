"""
/tools — file upload + PDF conversion endpoints.

Flow:
  1. Client uploads file  →  POST /tools/upload
  2. Backend stores file in R2, returns r2_key + url
  3. Client triggers convert  →  POST /tools/{slug}/convert
  4. Backend processes file, stores output in R2, saves record in DB
  5. Client polls or gets conversion record  →  GET /tools/conversion/{id}
"""

import uuid
from datetime import datetime

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from auth import get_current_user
from db import get_db
from models import Conversion, ConversionOut, UserProfile
from services import r2_service, pdf_service

router = APIRouter()


# ── 1. Upload file to R2 ──────────────────────────────────────────────────────

@router.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user),
):
    """Upload a file to Cloudflare R2. Returns the R2 key and URL."""
    uid = current_user["uid"]
    key, url = await r2_service.upload_file(file, uid, prefix="inputs")
    return {
        "r2_key": key,
        "r2_url": url,
        "file_name": file.filename,
        "file_size": file.size or 0,
    }


# ── 2. Convert a file ─────────────────────────────────────────────────────────

@router.post("/{slug}/convert", response_model=ConversionOut)
async def convert_file(
    slug: str,
    file: UploadFile = File(...),
    tool_label: str = Form(...),
    password: str = Form(default=""),
    owner_password: str = Form(default=""),
    pages_per_chunk: int = Form(default=1),
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    uid = current_user["uid"]

    # Ensure profile exists
    result = await db.execute(select(UserProfile).where(UserProfile.uid == uid))
    profile = result.scalar_one_or_none()
    if not profile:
        profile = UserProfile(
            uid=uid,
            email=current_user.get("email", ""),
            full_name=current_user.get("name"),
        )
        db.add(profile)
        await db.flush()

    # Upload input to R2
    input_key, input_url = await r2_service.upload_file(file, uid, prefix="inputs")
    await file.seek(0)
    file_data = await file.read()

    # Create conversion record (status=processing)
    conv = Conversion(
        uid=uid,
        tool_slug=slug,
        tool_label=tool_label,
        file_name=file.filename or "file",
        file_size=len(file_data),
        input_r2_key=input_key,
        input_r2_url=input_url,
        status="processing",
    )
    db.add(conv)
    await db.flush()

    # Process
    try:
        extra = {"password": password, "owner_password": owner_password}
        output_data: bytes | None = None

        if slug == "pdf-merge":
            raise HTTPException(400, "Merge requires multiple files — use /tools/pdf-merge/merge")
        elif slug == "pdf-split":
            chunks = pdf_service.split_pdf(file_data, pages_per_chunk)
            # For simplicity return first chunk; full implementation returns a zip
            output_data = chunks[0] if chunks else file_data
        elif slug == "pdf-to-image":
            images = pdf_service.pdf_to_images(file_data)
            output_data = images[0] if images else b""
        elif slug == "password-protect":
            output_data = pdf_service.protect_pdf(file_data, owner_password or "owner", password)
        elif slug in pdf_service.SLUG_MAP and pdf_service.SLUG_MAP[slug]:
            output_data = pdf_service.SLUG_MAP[slug](file_data, extra)
        else:
            raise HTTPException(400, f"Unknown tool slug: {slug}")

        # Derive output extension
        ext_map = {
            "pdf-to-word": "docx", "word-to-pdf": "pdf", "excel-to-pdf": "pdf",
            "powerpoint-to-pdf": "pdf", "pdf-merge": "pdf", "pdf-split": "pdf",
            "pdf-compress": "pdf", "image-to-pdf": "pdf", "pdf-to-image": "jpg",
            "password-protect": "pdf", "unlock-pdf": "pdf",
        }
        out_ext = ext_map.get(slug, "pdf")
        out_name = file.filename.rsplit(".", 1)[0] + f"_converted.{out_ext}"
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


# ── 3. Multi-file merge ───────────────────────────────────────────────────────

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
        uid=uid,
        tool_slug="pdf-merge",
        tool_label="Merge PDF",
        file_name="merged.pdf",
        file_size=len(merged),
        input_r2_key="",
        input_r2_url="",
        output_r2_key=out_key,
        output_r2_url=out_url,
        status="completed",
    )
    db.add(conv)
    await db.flush()
    return conv


# ── 4. Get a conversion record ────────────────────────────────────────────────

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
