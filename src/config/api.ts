// ─────────────────────────────────────────────────────────────────────────────
// FastAPI Backend Service Layer
// TODO: Replace BASE_URL with your hosted FastAPI URL e.g.:
//       https://api.viadocs.in  or  https://viadocs-api.railway.app
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL = "https://YOUR_FASTAPI_BACKEND_URL";

// ── Helper: attach Firebase ID token to every request ──────────────────────
async function getToken(): Promise<string | null> {
  try {
    const { auth } = await import("@/config/firebase");
    const user = auth.currentUser;
    if (!user) return null;
    return await user.getIdToken();
  } catch {
    return null;
  }
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown
): Promise<T> {
  const token = await getToken();
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || "API request failed");
  }
  return res.json();
}

async function upload(path: string, file: File, extra?: Record<string, string>): Promise<UploadResponse> {
  const token = await getToken();
  const form = new FormData();
  form.append("file", file);
  if (extra) {
    Object.entries(extra).forEach(([k, v]) => form.append(k, v));
  }
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: form,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || "Upload failed");
  }
  return res.json();
}

// ── Types ──────────────────────────────────────────────────────────────────

export interface UserProfile {
  id: string;
  uid: string;           // Firebase UID
  email: string;
  full_name: string;
  avatar_url?: string;   // Cloudflare R2 URL
  created_at: string;
}

export interface Conversion {
  id: string;
  uid: string;
  tool_slug: string;
  tool_label: string;
  file_name: string;
  file_size: number;
  input_r2_url: string;   // Cloudflare R2 URL of uploaded file
  output_r2_url?: string; // Cloudflare R2 URL of converted file
  status: "pending" | "processing" | "completed" | "failed";
  created_at: string;
}

export interface UploadResponse {
  r2_url: string;
  file_name: string;
  file_size: number;
}

export interface ConvertResponse {
  conversion_id: string;
  output_r2_url: string;
  status: string;
}

// ── Profile Endpoints ──────────────────────────────────────────────────────

export const profileApi = {
  /** GET /profile — fetch logged-in user's profile */
  get: () => request<UserProfile>("GET", "/profile"),

  /** PUT /profile — update display name or avatar */
  update: (data: Partial<Pick<UserProfile, "full_name" | "avatar_url">>) =>
    request<UserProfile>("PUT", "/profile", data),

  /** POST /profile/avatar — upload avatar to R2, returns new URL */
  uploadAvatar: (file: File) => upload("/profile/avatar", file),
};

// ── File / Conversion Endpoints ─────────────────────────────────────────────

export const filesApi = {
  /**
   * POST /upload
   * Uploads a file to Cloudflare R2 via FastAPI.
   * Returns the R2 URL stored in MariaDB.
   */
  upload: (file: File) => upload("/upload", file),

  /**
   * POST /convert
   * Triggers a conversion job on FastAPI.
   * FastAPI processes the file and saves output to R2.
   */
  convert: (payload: {
    tool_slug: string;
    tool_label: string;
    input_r2_url: string;
    file_name: string;
    file_size: number;
  }) => request<ConvertResponse>("POST", "/convert", payload),

  /**
   * GET /conversions — paginated list of user's conversion history
   */
  list: (page = 1, limit = 20) =>
    request<Conversion[]>("GET", `/conversions?page=${page}&limit=${limit}`),

  /**
   * GET /conversions/:id — single conversion record
   */
  get: (id: string) => request<Conversion>("GET", `/conversions/${id}`),

  /**
   * DELETE /conversions/:id — remove a record from MariaDB
   */
  delete: (id: string) => request<{ success: boolean }>("DELETE", `/conversions/${id}`),
};
