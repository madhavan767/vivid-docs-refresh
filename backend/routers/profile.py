"""
/profile — get and update user profile. Auto-creates profile on first call.
"""

from fastapi import APIRouter, Depends, File, UploadFile
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from auth import get_current_user
from db import get_db
from models import UserProfile, ProfileOut, ProfileUpdate
from services import r2_service

router = APIRouter()


async def _get_or_create_profile(uid: str, decoded: dict, db: AsyncSession) -> UserProfile:
    result = await db.execute(select(UserProfile).where(UserProfile.uid == uid))
    profile = result.scalar_one_or_none()
    if not profile:
        profile = UserProfile(
            uid=uid,
            email=decoded.get("email", ""),
            full_name=decoded.get("name"),
            avatar_url=decoded.get("picture"),
        )
        db.add(profile)
        await db.flush()
    return profile


@router.get("/", response_model=ProfileOut)
async def get_profile(
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    profile = await _get_or_create_profile(current_user["uid"], current_user, db)
    return profile


@router.put("/", response_model=ProfileOut)
async def update_profile(
    body: ProfileUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    profile = await _get_or_create_profile(current_user["uid"], current_user, db)
    if body.full_name is not None:
        profile.full_name = body.full_name
    if body.avatar_url is not None:
        profile.avatar_url = body.avatar_url
    await db.flush()
    return profile


@router.post("/avatar", response_model=ProfileOut)
async def upload_avatar(
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user),
):
    uid = current_user["uid"]
    key, url = await r2_service.upload_file(file, uid, prefix="avatars")
    profile = await _get_or_create_profile(uid, current_user, db)
    profile.avatar_url = url
    await db.flush()
    return profile
