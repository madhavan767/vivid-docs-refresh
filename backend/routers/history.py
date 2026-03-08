"""
/history — user's conversion history (read + delete).
"""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete

from auth import get_current_user
from db import get_db
from models import Conversion, ConversionOut

router = APIRouter()


@router.get("/", response_model=list[ConversionOut])
async def get_history(
    page: int = Query(default=1, ge=1),
    limit: int = Query(default=20, le=100),
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    """Return paginated conversion history for the logged-in user."""
    offset = (page - 1) * limit
    result = await db.execute(
        select(Conversion)
        .where(Conversion.uid == current_user["uid"])
        .order_by(Conversion.created_at.desc())
        .offset(offset)
        .limit(limit)
    )
    return result.scalars().all()


@router.delete("/{conversion_id}")
async def delete_conversion(
    conversion_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    """Delete a single conversion record owned by the logged-in user."""
    result = await db.execute(
        select(Conversion).where(
            Conversion.id == conversion_id,
            Conversion.uid == current_user["uid"],
        )
    )
    conv = result.scalar_one_or_none()
    if not conv:
        raise HTTPException(status_code=404, detail="Conversion not found")
    await db.delete(conv)
    return {"success": True}


@router.delete("/")
async def clear_history(
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    """Delete ALL conversion records for the logged-in user."""
    await db.execute(
        delete(Conversion).where(Conversion.uid == current_user["uid"])
    )
    return {"success": True}
