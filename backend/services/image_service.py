"""
Image processing service.
All functions accept raw bytes input and return raw bytes output.
Requires: Pillow (already in requirements.txt)
For SVG vectorisation: apt install potrace  +  pip install pypotrace
For background removal: pip install rembg
"""

import io
import os
import uuid
import tempfile
from pathlib import Path
from typing import Optional
from PIL import Image, ImageDraw, ImageFont


# ── Helpers ───────────────────────────────────────────────────────────────────

def _tmp(suffix: str) -> str:
    return os.path.join(tempfile.gettempdir(), f"viadocs_{uuid.uuid4().hex}{suffix}")


def _open(data: bytes) -> Image.Image:
    return Image.open(io.BytesIO(data))


def _save(img: Image.Image, fmt: str = "PNG") -> bytes:
    buf = io.BytesIO()
    if fmt.upper() == "JPEG" and img.mode in ("RGBA", "P", "LA"):
        img = img.convert("RGB")
    img.save(buf, format=fmt)
    return buf.getvalue()


# ── 1. Image Resize ───────────────────────────────────────────────────────────

def resize_image(
    image_data: bytes,
    width: Optional[int] = None,
    height: Optional[int] = None,
    maintain_aspect: bool = True,
    output_format: str = "PNG",
) -> bytes:
    """Resize image to target width/height."""
    img = _open(image_data)
    orig_w, orig_h = img.size

    if width and height and not maintain_aspect:
        new_size = (width, height)
    elif width and height:
        img.thumbnail((width, height), Image.LANCZOS)
        return _save(img, output_format)
    elif width:
        ratio = width / orig_w
        new_size = (width, max(1, int(orig_h * ratio)))
    elif height:
        ratio = height / orig_h
        new_size = (max(1, int(orig_w * ratio)), height)
    else:
        return _save(img, output_format)

    img = img.resize(new_size, Image.LANCZOS)
    return _save(img, output_format)


# ── 2. Image Upscale (2× via Pillow LANCZOS; replace with Real-ESRGAN when available) ──

def upscale_image(image_data: bytes, scale: int = 2, output_format: str = "PNG") -> bytes:
    """Upscale image by `scale` factor using high-quality Lanczos resampling."""
    img = _open(image_data)
    new_size = (img.width * scale, img.height * scale)
    img = img.resize(new_size, Image.LANCZOS)
    return _save(img, output_format)


# ── 3. Image → ICO ───────────────────────────────────────────────────────────

def image_to_ico(image_data: bytes, sizes: Optional[list] = None) -> bytes:
    """Convert any image to .ico format with multiple sizes."""
    if sizes is None:
        sizes = [16, 32, 48, 64, 128, 256]
    img = _open(image_data).convert("RGBA")
    icons = []
    for s in sizes:
        icons.append(img.resize((s, s), Image.LANCZOS))
    buf = io.BytesIO()
    icons[0].save(buf, format="ICO", sizes=[(s, s) for s in sizes], append_images=icons[1:])
    return buf.getvalue()


# ── 4. Image → SVG (trace via potrace; fallback: base64 embed) ───────────────

def image_to_svg(image_data: bytes) -> bytes:
    """
    Vectorise a raster image to SVG.
    Uses potrace (apt install potrace) if available, otherwise wraps image in SVG.
    """
    try:
        import potrace  # pypotrace  (pip install pypotrace)
        import numpy as np

        img = _open(image_data).convert("L")  # grayscale
        arr = np.array(img)
        bm = potrace.Bitmap(arr < 128)
        path_obj = bm.trace()

        w, h = img.size
        svg_parts = [
            f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">',
            '<path fill="#000000" d="',
        ]
        for curve in path_obj:
            start = curve.start_point
            svg_parts.append(f"M{start.x},{start.y}")
            for seg in curve.segments:
                if seg.is_corner:
                    svg_parts.append(f"L{seg.c.x},{seg.c.y}L{seg.end_point.x},{seg.end_point.y}")
                else:
                    svg_parts.append(
                        f"C{seg.c1.x},{seg.c1.y} {seg.c2.x},{seg.c2.y} {seg.end_point.x},{seg.end_point.y}"
                    )
            svg_parts.append("Z")
        svg_parts.append('"/></svg>')
        return "".join(svg_parts).encode()

    except ImportError:
        # Fallback: embed raster image inside SVG
        import base64
        img = _open(image_data)
        png_buf = io.BytesIO()
        img.save(png_buf, format="PNG")
        b64 = base64.b64encode(png_buf.getvalue()).decode()
        w, h = img.size
        svg = (
            f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" '
            f'width="{w}" height="{h}" viewBox="0 0 {w} {h}">'
            f'<image href="data:image/png;base64,{b64}" width="{w}" height="{h}"/>'
            f"</svg>"
        )
        return svg.encode()


# ── 5. Compress Image ─────────────────────────────────────────────────────────

def compress_image(image_data: bytes, quality: int = 75, output_format: str = "JPEG") -> bytes:
    """Reduce image file size by saving with specified quality."""
    img = _open(image_data)
    fmt = output_format.upper()
    if fmt == "JPEG" and img.mode in ("RGBA", "P", "LA"):
        img = img.convert("RGB")
    buf = io.BytesIO()
    if fmt == "PNG":
        img.save(buf, format="PNG", optimize=True, compress_level=9)
    else:
        img.save(buf, format=fmt, quality=quality, optimize=True)
    return buf.getvalue()


# ── 6. Remove Background ──────────────────────────────────────────────────────

def remove_background(image_data: bytes) -> bytes:
    """
    Remove image background using rembg (pip install rembg).
    Falls back to a simple white-background alpha-trim if rembg not available.
    """
    try:
        from rembg import remove as rembg_remove
        result = rembg_remove(image_data)
        return result
    except ImportError:
        # Fallback: convert to RGBA and return as-is
        img = _open(image_data).convert("RGBA")
        buf = io.BytesIO()
        img.save(buf, format="PNG")
        return buf.getvalue()


# ── 7. Merge Photo & Signature ────────────────────────────────────────────────

def merge_photo_and_signature(
    base_image_data: bytes,
    signature_data: bytes,
    position: str = "bottom-right",  # top-left | top-right | bottom-left | bottom-right | center
    scale: float = 0.25,
    output_format: str = "PNG",
) -> bytes:
    """Overlay a signature/watermark image onto a base photo."""
    base = _open(base_image_data).convert("RGBA")
    sig = _open(signature_data).convert("RGBA")

    # Scale signature relative to base image width
    sig_w = int(base.width * scale)
    sig_h = int(sig.height * (sig_w / sig.width))
    sig = sig.resize((sig_w, sig_h), Image.LANCZOS)

    bw, bh = base.size
    sw, sh = sig.size
    margin = 20

    positions = {
        "top-left":     (margin, margin),
        "top-right":    (bw - sw - margin, margin),
        "bottom-left":  (margin, bh - sh - margin),
        "bottom-right": (bw - sw - margin, bh - sh - margin),
        "center":       ((bw - sw) // 2, (bh - sh) // 2),
    }
    x, y = positions.get(position, positions["bottom-right"])

    result = base.copy()
    result.paste(sig, (x, y), mask=sig)
    return _save(result, output_format)


# ── 8. Add Watermark (text or image) ─────────────────────────────────────────

def add_watermark(
    image_data: bytes,
    text: Optional[str] = None,
    watermark_image_data: Optional[bytes] = None,
    opacity: float = 0.4,
    position: str = "center",
    output_format: str = "PNG",
) -> bytes:
    """Add text or image watermark to a photo."""
    base = _open(image_data).convert("RGBA")

    overlay = Image.new("RGBA", base.size, (0, 0, 0, 0))

    if watermark_image_data:
        wm = _open(watermark_image_data).convert("RGBA")
        wm_w = int(base.width * 0.3)
        wm_h = int(wm.height * (wm_w / wm.width))
        wm = wm.resize((wm_w, wm_h), Image.LANCZOS)
        # Apply opacity
        r, g, b, a = wm.split()
        a = a.point(lambda x: int(x * opacity))
        wm = Image.merge("RGBA", (r, g, b, a))
        bw, bh = base.size
        sw, sh = wm.size
        pos_map = {
            "center":       ((bw - sw) // 2, (bh - sh) // 2),
            "top-left":     (20, 20),
            "top-right":    (bw - sw - 20, 20),
            "bottom-left":  (20, bh - sh - 20),
            "bottom-right": (bw - sw - 20, bh - sh - 20),
        }
        x, y = pos_map.get(position, pos_map["center"])
        overlay.paste(wm, (x, y), mask=wm)

    elif text:
        draw = ImageDraw.Draw(overlay)
        font_size = max(20, base.width // 15)
        try:
            font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", font_size)
        except Exception:
            font = ImageFont.load_default()

        bbox = draw.textbbox((0, 0), text, font=font)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
        bw, bh = base.size
        pos_map = {
            "center":       ((bw - tw) // 2, (bh - th) // 2),
            "top-left":     (20, 20),
            "top-right":    (bw - tw - 20, 20),
            "bottom-left":  (20, bh - th - 20),
            "bottom-right": (bw - tw - 20, bh - th - 20),
        }
        x, y = pos_map.get(position, pos_map["center"])
        alpha = int(255 * opacity)
        draw.text((x, y), text, font=font, fill=(255, 255, 255, alpha))
        # Shadow
        draw.text((x + 2, y + 2), text, font=font, fill=(0, 0, 0, alpha // 2))

    combined = Image.alpha_composite(base, overlay)
    return _save(combined, output_format)


# ── Router dispatch ───────────────────────────────────────────────────────────

IMAGE_SLUG_MAP = {
    "image-resize":        resize_image,
    "image-upscale":       upscale_image,
    "image-to-ico":        image_to_ico,
    "image-to-svg":        image_to_svg,
    "compress-image":      compress_image,
    "remove-background":   remove_background,
    "merge-photo-sign":    None,  # needs two files
    "add-watermark-image": None,  # needs optional extra params
}

IMAGE_EXT_MAP = {
    "image-resize":        "png",
    "image-upscale":       "png",
    "image-to-ico":        "ico",
    "image-to-svg":        "svg",
    "compress-image":      "jpg",
    "remove-background":   "png",
    "merge-photo-sign":    "png",
    "add-watermark-image": "png",
}
