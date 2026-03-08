"""
SQLAlchemy ORM models + Pydantic schemas for all entities.
"""

import uuid
from datetime import datetime
from typing import Optional
from sqlalchemy import String, Integer, BigInteger, Text, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from pydantic import BaseModel, EmailStr
from db import Base


# ── SQLAlchemy ORM Models ─────────────────────────────────────────────────────

class UserProfile(Base):
    __tablename__ = "profiles"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    uid: Mapped[str] = mapped_column(String(128), unique=True, nullable=False, index=True)  # Firebase UID
    email: Mapped[str] = mapped_column(String(255), nullable=False)
    full_name: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    avatar_url: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    conversions: Mapped[list["Conversion"]] = relationship("Conversion", back_populates="user", cascade="all, delete-orphan")
    favorites: Mapped[list["Favorite"]] = relationship("Favorite", back_populates="user", cascade="all, delete-orphan")


class Conversion(Base):
    __tablename__ = "conversions"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    uid: Mapped[str] = mapped_column(String(128), ForeignKey("profiles.uid", ondelete="CASCADE"), nullable=False, index=True)
    tool_slug: Mapped[str] = mapped_column(String(64), nullable=False)
    tool_label: Mapped[str] = mapped_column(String(128), nullable=False)
    file_name: Mapped[str] = mapped_column(String(512), nullable=False)
    file_size: Mapped[int] = mapped_column(BigInteger, default=0)
    input_r2_key: Mapped[str] = mapped_column(Text, nullable=False)   # R2 object key
    output_r2_key: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    input_r2_url: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    output_r2_url: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    status: Mapped[str] = mapped_column(String(32), default="pending")  # pending | processing | completed | failed
    error_message: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    user: Mapped["UserProfile"] = relationship("UserProfile", back_populates="conversions")


class Favorite(Base):
    __tablename__ = "favorites"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    uid: Mapped[str] = mapped_column(String(128), ForeignKey("profiles.uid", ondelete="CASCADE"), nullable=False, index=True)
    tool_slug: Mapped[str] = mapped_column(String(64), nullable=False)
    tool_label: Mapped[str] = mapped_column(String(128), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    user: Mapped["UserProfile"] = relationship("UserProfile", back_populates="favorites")


# ── Pydantic Schemas ──────────────────────────────────────────────────────────

class ProfileOut(BaseModel):
    id: str
    uid: str
    email: str
    full_name: Optional[str]
    avatar_url: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


class ProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    avatar_url: Optional[str] = None


class ConversionOut(BaseModel):
    id: str
    uid: str
    tool_slug: str
    tool_label: str
    file_name: str
    file_size: int
    input_r2_url: Optional[str]
    output_r2_url: Optional[str]
    status: str
    error_message: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


class FavoriteOut(BaseModel):
    id: str
    uid: str
    tool_slug: str
    tool_label: str
    created_at: datetime

    class Config:
        from_attributes = True


class FavoriteCreate(BaseModel):
    tool_slug: str
    tool_label: str
