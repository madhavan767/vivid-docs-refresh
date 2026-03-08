"""
Cloudflare R2 service — upload/download/delete using boto3 (S3-compatible).
"""

import os
import uuid
import boto3
from botocore.config import Config
from fastapi import UploadFile

R2_ACCOUNT_ID     = os.getenv("R2_ACCOUNT_ID", "")
R2_ACCESS_KEY_ID  = os.getenv("R2_ACCESS_KEY_ID", "")
R2_SECRET_KEY     = os.getenv("R2_SECRET_ACCESS_KEY", "")
R2_BUCKET         = os.getenv("R2_BUCKET_NAME", "viadocs-files")
R2_PUBLIC_URL     = os.getenv("R2_PUBLIC_URL", "")   # e.g. https://pub-xxx.r2.dev

_s3 = boto3.client(
    "s3",
    endpoint_url=f"https://{R2_ACCOUNT_ID}.r2.cloudflarestorage.com",
    aws_access_key_id=R2_ACCESS_KEY_ID,
    aws_secret_access_key=R2_SECRET_KEY,
    config=Config(signature_version="s3v4"),
    region_name="auto",
)


def _key(uid: str, filename: str, prefix: str = "uploads") -> str:
    ext = filename.rsplit(".", 1)[-1] if "." in filename else "bin"
    return f"{prefix}/{uid}/{uuid.uuid4()}.{ext}"


async def upload_file(file: UploadFile, uid: str, prefix: str = "uploads") -> tuple[str, str]:
    """
    Upload an UploadFile to R2.
    Returns (object_key, public_url).
    """
    key = _key(uid, file.filename or "file", prefix)
    contents = await file.read()
    _s3.put_object(
        Bucket=R2_BUCKET,
        Key=key,
        Body=contents,
        ContentType=file.content_type or "application/octet-stream",
    )
    public_url = f"{R2_PUBLIC_URL}/{key}" if R2_PUBLIC_URL else key
    return key, public_url


def upload_bytes(data: bytes, key: str, content_type: str = "application/octet-stream") -> str:
    """Upload raw bytes to R2. Returns public URL."""
    _s3.put_object(Bucket=R2_BUCKET, Key=key, Body=data, ContentType=content_type)
    return f"{R2_PUBLIC_URL}/{key}" if R2_PUBLIC_URL else key


def download_bytes(key: str) -> bytes:
    """Download an object from R2 by key."""
    obj = _s3.get_object(Bucket=R2_BUCKET, Key=key)
    return obj["Body"].read()


def delete_object(key: str) -> None:
    """Delete an object from R2."""
    _s3.delete_object(Bucket=R2_BUCKET, Key=key)


def presigned_url(key: str, expires_in: int = 3600) -> str:
    """Generate a presigned GET URL valid for `expires_in` seconds."""
    return _s3.generate_presigned_url(
        "get_object",
        Params={"Bucket": R2_BUCKET, "Key": key},
        ExpiresIn=expires_in,
    )
