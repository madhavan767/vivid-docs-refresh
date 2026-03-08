"""
Viadocs FastAPI Backend
Run: uvicorn main:app --reload --host 0.0.0.0 --port 8000
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import os
from dotenv import load_dotenv

load_dotenv()

from db import engine, Base
from routers import tools, history, favorites, profile

# ── Startup / Shutdown ────────────────────────────────────────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create all tables on startup if they don't exist
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    await engine.dispose()

# ── App ───────────────────────────────────────────────────────────────────────
app = FastAPI(
    title="Viadocs API",
    version="1.0.0",
    description="Backend for Viadocs — PDF tools, document editor, and AI features.",
    lifespan=lifespan,
)

# ── CORS ──────────────────────────────────────────────────────────────────────
origins = [o.strip() for o in os.getenv("ALLOWED_ORIGINS", "*").split(",")]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ───────────────────────────────────────────────────────────────────
app.include_router(tools.router,     prefix="/tools",     tags=["tools"])
app.include_router(history.router,   prefix="/history",   tags=["history"])
app.include_router(favorites.router, prefix="/favorites", tags=["favorites"])
app.include_router(profile.router,   prefix="/profile",   tags=["profile"])

@app.get("/health")
async def health():
    return {"status": "ok", "version": "1.0.0"}
