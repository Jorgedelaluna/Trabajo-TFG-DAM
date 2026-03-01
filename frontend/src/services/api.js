// src/services/api.js
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function parseResponse(res) {
  const ct = res.headers.get("content-type") || "";
  const isJson = ct.includes("application/json");
  const data = isJson ? await res.json().catch(() => null) : await res.text().catch(() => null);

  if (!res.ok) {
    const msg =
      (data && typeof data === "object" && (data.message || data.error)) ||
      (typeof data === "string" && data) ||
      `HTTP ${res.status}`;
    throw new Error(msg);
  }

  return data;
}

export const api = {
  get: async (endpoint, options = {}) => {
    const { auth = true } = options;

    const res = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        ...(auth ? getAuthHeaders() : {}),
      },
    });

    return parseResponse(res);
  },

  post: async (endpoint, body, options = {}) => {
    const { auth = true } = options;

    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(auth ? getAuthHeaders() : {}),
      },
      body: JSON.stringify(body ?? {}),
    });

    return parseResponse(res);
  },

  put: async (endpoint, body, options = {}) => {
    const { auth = true } = options;

    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(auth ? getAuthHeaders() : {}),
      },
      body: JSON.stringify(body ?? {}),
    });

    return parseResponse(res);
  },

  del: async (endpoint, options = {}) => {
    const { auth = true } = options;

    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        ...(auth ? getAuthHeaders() : {}),
      },
    });

    return parseResponse(res);
  },
};
