"""
MariaDB (SkySQL) connection via SQLAlchemy async + aiomysql
SSL is required for SkySQL serverless connections.
"""

import os
import ssl
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase

DB_HOST = os.getenv("DB_HOST", "serverless-europe-west4.sysp0000.db2.skysql.com")
DB_PORT = int(os.getenv("DB_PORT", "4019"))
DB_USER = os.getenv("DB_USER", "dbpgf06265391")
DB_PASS = os.getenv("DB_PASS", "")
DB_NAME = os.getenv("DB_NAME", "viadocs")
USE_SSL = os.getenv("DB_SSL", "true").lower() == "true"

# Build aiomysql connection URL
DATABASE_URL = (
    f"mysql+aiomysql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
)

# SSL context for SkySQL
connect_args = {}
if USE_SSL:
    ssl_ctx = ssl.create_default_context()
    ssl_ctx.check_hostname = False
    ssl_ctx.verify_mode = ssl.CERT_NONE   # set to CERT_REQUIRED + CA bundle in production
    connect_args["ssl"] = ssl_ctx

engine = create_async_engine(
    DATABASE_URL,
    echo=False,
    pool_pre_ping=True,
    pool_size=5,
    max_overflow=10,
    connect_args=connect_args,
)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False,
    autocommit=False,
)

class Base(DeclarativeBase):
    pass

# ── Dependency ────────────────────────────────────────────────────────────────
async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
