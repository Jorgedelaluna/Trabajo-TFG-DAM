const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

function getToken() {
  return localStorage.getItem("token");
}

export async function apiFetch(path, { method = "GET", body, auth = true, headers = {} } = {}) {
  const token = getToken();

  const finalHeaders = {
    "Content-Type": "application/json",
    ...headers,
  };

  if (auth && token) {
    finalHeaders.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: finalHeaders,
    body: body ? JSON.stringify(body) : undefined,
  });

  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await res.json().catch(() => null) : await res.text().catch(() => null);

  if (!res.ok) {
    const msg =
      (data && typeof data === "object" && (data.message || data.error)) ||
      (typeof data === "string" && data) ||
      `HTTP ${res.status}`;
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

export const api = {
  get: (p) => apiFetch(p),
  post: (p, b, opts) => apiFetch(p, { method: "POST", body: b, ...opts }),
  put: (p, b, opts) => apiFetch(p, { method: "PUT", body: b, ...opts }),
  del: (p, opts) => apiFetch(p, { method: "DELETE", ...opts }),
};
