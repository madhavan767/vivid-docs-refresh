"""
PDF processing service.
All functions accept raw bytes input and return raw bytes output.
"""

import io
import os
import uuid
import subprocess
import tempfile
from pathlib import Path
from typing import Optional

from pypdf import PdfReader, PdfWriter
import pikepdf
import img2pdf
from PIL import Image


# ── Helpers ───────────────────────────────────────────────────────────────────

def _tmp(suffix: str) -> str:
    return os.path.join(tempfile.gettempdir(), f"viadocs_{uuid.uuid4().hex}{suffix}")


# ── 1. Merge PDFs ─────────────────────────────────────────────────────────────

def merge_pdfs(pdf_files: list[bytes]) -> bytes:
    """Merge multiple PDFs into one."""
    writer = PdfWriter()
    for data in pdf_files:
        reader = PdfReader(io.BytesIO(data))
        for page in reader.pages:
            writer.add_page(page)
    out = io.BytesIO()
    writer.write(out)
    return out.getvalue()


# ── 2. Split PDF ──────────────────────────────────────────────────────────────

def split_pdf(pdf_data: bytes, pages_per_chunk: int = 1) -> list[bytes]:
    """Split PDF into chunks. Returns list of PDF bytes."""
    reader = PdfReader(io.BytesIO(pdf_data))
    total = len(reader.pages)
    chunks = []
    for start in range(0, total, pages_per_chunk):
        writer = PdfWriter()
        for i in range(start, min(start + pages_per_chunk, total)):
            writer.add_page(reader.pages[i])
        buf = io.BytesIO()
        writer.write(buf)
        chunks.append(buf.getvalue())
    return chunks


# ── 3. Compress PDF ───────────────────────────────────────────────────────────

def compress_pdf(pdf_data: bytes, quality: str = "screen") -> bytes:
    """
    Compress PDF using Ghostscript.
    quality: screen | ebook | printer | prepress
    Requires: apt install ghostscript
    """
    inp = _tmp(".pdf")
    out = _tmp(".pdf")
    try:
        with open(inp, "wb") as f:
            f.write(pdf_data)
        subprocess.run(
            [
                "gs", "-sDEVICE=pdfwrite", "-dCompatibilityLevel=1.4",
                f"-dPDFSETTINGS=/{quality}", "-dNOPAUSE", "-dBATCH", "-dQUIET",
                f"-sOutputFile={out}", inp,
            ],
            check=True, capture_output=True,
        )
        with open(out, "rb") as f:
            return f.read()
    finally:
        for p in [inp, out]:
            if os.path.exists(p):
                os.remove(p)


# ── 4. PDF → Word (.docx) ─────────────────────────────────────────────────────

def pdf_to_word(pdf_data: bytes) -> bytes:
    """Convert PDF to DOCX using pdf2docx."""
    from pdf2docx import Converter
    inp = _tmp(".pdf")
    out = _tmp(".docx")
    try:
        with open(inp, "wb") as f:
            f.write(pdf_data)
        cv = Converter(inp)
        cv.convert(out, start=0, end=None)
        cv.close()
        with open(out, "rb") as f:
            return f.read()
    finally:
        for p in [inp, out]:
            if os.path.exists(p):
                os.remove(p)


# ── 5. Office → PDF (LibreOffice CLI) ────────────────────────────────────────

def office_to_pdf(file_data: bytes, ext: str) -> bytes:
    """
    Convert Word/Excel/PPT → PDF using LibreOffice headless.
    Requires: apt install libreoffice
    ext: docx | xlsx | pptx | doc | xls | ppt
    """
    inp = _tmp(f".{ext}")
    out_dir = tempfile.gettempdir()
    out = os.path.join(out_dir, Path(inp).stem + ".pdf")
    try:
        with open(inp, "wb") as f:
            f.write(file_data)
        subprocess.run(
            [
                "libreoffice", "--headless", "--convert-to", "pdf",
                "--outdir", out_dir, inp,
            ],
            check=True, capture_output=True, timeout=60,
        )
        with open(out, "rb") as f:
            return f.read()
    finally:
        for p in [inp, out]:
            if os.path.exists(p):
                os.remove(p)


# ── 6. Image → PDF ────────────────────────────────────────────────────────────

def images_to_pdf(image_files: list[bytes]) -> bytes:
    """Convert one or more images (JPEG/PNG/WEBP) to a PDF."""
    converted = []
    for img_data in image_files:
        img = Image.open(io.BytesIO(img_data))
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")
        buf = io.BytesIO()
        img.save(buf, format="JPEG")
        converted.append(buf.getvalue())
    return img2pdf.convert(converted)


# ── 7. PDF → Images ───────────────────────────────────────────────────────────

def pdf_to_images(pdf_data: bytes, fmt: str = "jpeg", dpi: int = 150) -> list[bytes]:
    """
    Render each PDF page as an image.
    Requires: apt install poppler-utils
    Returns list of image bytes.
    """
    inp = _tmp(".pdf")
    out_prefix = _tmp("")
    try:
        with open(inp, "wb") as f:
            f.write(pdf_data)
        subprocess.run(
            ["pdftoppm", f"-{fmt}", "-r", str(dpi), inp, out_prefix],
            check=True, capture_output=True,
        )
        images = []
        for p in sorted(Path(tempfile.gettempdir()).glob(f"{Path(out_prefix).name}*")):
            with open(p, "rb") as f:
                images.append(f.read())
            os.remove(p)
        return images
    finally:
        if os.path.exists(inp):
            os.remove(inp)


# ── 8. Protect PDF (add password) ─────────────────────────────────────────────

def protect_pdf(pdf_data: bytes, owner_pwd: str, user_pwd: str) -> bytes:
    """Encrypt PDF with owner + user passwords."""
    inp = _tmp(".pdf")
    out = _tmp(".pdf")
    try:
        with open(inp, "wb") as f:
            f.write(pdf_data)
        with pikepdf.open(inp) as pdf:
            pdf.save(
                out,
                encryption=pikepdf.Encryption(owner=owner_pwd, user=user_pwd, R=4),
            )
        with open(out, "rb") as f:
            return f.read()
    finally:
        for p in [inp, out]:
            if os.path.exists(p):
                os.remove(p)


# ── 9. Unlock PDF (remove password) ──────────────────────────────────────────

def unlock_pdf(pdf_data: bytes, password: Optional[str] = None) -> bytes:
    """Remove encryption from a PDF."""
    inp = _tmp(".pdf")
    out = _tmp(".pdf")
    try:
        with open(inp, "wb") as f:
            f.write(pdf_data)
        open_kwargs = {"password": password} if password else {}
        with pikepdf.open(inp, **open_kwargs) as pdf:
            pdf.save(out)
        with open(out, "rb") as f:
            return f.read()
    finally:
        for p in [inp, out]:
            if os.path.exists(p):
                os.remove(p)


# ── Router dispatch ───────────────────────────────────────────────────────────

SLUG_MAP = {
    "pdf-to-word":        lambda data, _: pdf_to_word(data),
    "word-to-pdf":        lambda data, _: office_to_pdf(data, "docx"),
    "pdf-merge":          None,   # handled separately (multi-file)
    "pdf-split":          None,   # returns list
    "pdf-compress":       lambda data, _: compress_pdf(data),
    "image-to-pdf":       lambda data, _: images_to_pdf([data]),
    "pdf-to-image":       None,   # returns list
    "password-protect":   None,   # needs extra params
    "unlock-pdf":         lambda data, extra: unlock_pdf(data, extra.get("password")),
    "excel-to-pdf":       lambda data, _: office_to_pdf(data, "xlsx"),
    "powerpoint-to-pdf":  lambda data, _: office_to_pdf(data, "pptx"),
}
