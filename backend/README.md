# Viadocs Backend

FastAPI backend with MariaDB (SkySQL), Firebase Auth, Cloudflare R2.

## Quick Start (local)

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt

# Copy and fill in your credentials
cp .env.example .env
# → edit DB_PASS, FIREBASE_CREDENTIALS_PATH, R2_* keys

uvicorn main:app --reload
# API docs: http://localhost:8000/docs
```

## Environment Variables

| Variable | Description |
|---|---|
| `DB_HOST` | SkySQL hostname |
| `DB_PORT` | `4019` |
| `DB_USER` | SkySQL username |
| `DB_PASS` | SkySQL password |
| `DB_NAME` | Database name (create it first) |
| `FIREBASE_CREDENTIALS_PATH` | Path to Firebase service-account JSON |
| `R2_ACCOUNT_ID` | Cloudflare account ID |
| `R2_ACCESS_KEY_ID` | R2 API access key |
| `R2_SECRET_ACCESS_KEY` | R2 API secret |
| `R2_BUCKET_NAME` | R2 bucket name |
| `R2_PUBLIC_URL` | Public R2 URL (e.g. `https://pub-xxx.r2.dev`) |
| `ALLOWED_ORIGINS` | Comma-separated frontend origins |

## Firebase Service Account

1. Go to Firebase Console → Project Settings → Service Accounts
2. Click **Generate new private key** → download JSON
3. Save as `backend/firebase-service-account.json`
4. Add to `.gitignore`

## Create the Database

```sql
CREATE DATABASE viadocs CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Tables are auto-created on first startup via SQLAlchemy.

## Deploy to Railway

```bash
railway init
railway up
# Set all env vars in the Railway dashboard
```

## API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/health` | Health check |
| POST | `/tools/upload` | Upload file to R2 |
| POST | `/tools/{slug}/convert` | Convert file |
| POST | `/tools/pdf-merge/merge` | Merge multiple PDFs |
| GET | `/tools/conversion/{id}` | Get conversion status |
| GET | `/history/` | List conversion history |
| DELETE | `/history/{id}` | Delete a history record |
| GET | `/favorites/` | List favourites |
| POST | `/favorites/` | Add a favourite |
| DELETE | `/favorites/{slug}` | Remove a favourite |
| GET | `/profile/` | Get profile |
| PUT | `/profile/` | Update profile |
| POST | `/profile/avatar` | Upload avatar |
