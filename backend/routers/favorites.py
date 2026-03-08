"""
/favorites — save / remove / list favourite tools per user.
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete

from auth import get_current_user
from db import get_db
from models import Favorite, FavoriteOut, FavoriteCreate

router = APIRouter()


@router.get("/", response_model=list[FavoriteOut])
async def list_favorites(
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    result = await db.execute(
        select(Favorite)
        .where(Favorite.uid == current_user["uid"])
        .order_by(Favorite.created_at.desc())
    )
    return result.scalars().all()


@router.post("/", response_model=FavoriteOut, status_code=201)
async def add_favorite(
    body: FavoriteCreate,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    uid = current_user["uid"]
    # Prevent duplicate
    existing = await db.execute(
        select(Favorite).where(
            Favorite.uid == uid,
            Favorite.tool_slug == body.tool_slug,
        )
    )
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=409, detail="Already in favorites")

    fav = Favorite(uid=uid, tool_slug=body.tool_slug, tool_label=body.tool_label)
    db.add(fav)
    await db.flush()
    return fav


@router.delete("/{tool_slug}")
async def remove_favorite(
    tool_slug: str,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    result = await db.execute(
        select(Favorite).where(
            Favorite.uid == current_user["uid"],
            Favorite.tool_slug == tool_slug,
        )
    )
    fav = result.scalar_one_or_none()
    if not fav:
        raise HTTPException(status_code=404, detail="Favorite not found")
    await db.delete(fav)
    return {"success": True}
