// src/api/api.js
// ======================================================
// Módulo centralizado para realizar peticiones HTTP.
// Usa fetch y añade automáticamente:
// - Headers JSON
// - Token de autenticación (si existe)
// ======================================================
const API_URL =
    process.env.REACT_APP_API_URL || "http://localhost:8080";

export default API_URL;
// ======================================================
// Obtiene los headers comunes para todas las peticiones.
// Si existe un token en localStorage, lo añade.
// ======================================================
function getAuthHeaders() {
    const token = localStorage.getItem("token");

    const headers = {
        "Content-Type": "application/json"
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
}

// ======================================================
// Manejo centralizado de respuestas.
// Si la respuesta no es OK, lanza un error con el texto.
// ======================================================
async function handleResponse(response) {
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Error en la petición");
    }

    if (response.status === 204) return null;

    return response.json();
}

// ======================================================
// Métodos HTTP generícos
// Si la respuesta no es OK, lanza un error con el texto.
// ======================================================
export async function apiGet(endpoint) {
    const response = await fetch(`${API_URL}${endpoint}`, {
        headers: getAuthHeaders()
    });
    return handleResponse(response);
}

export async function apiPost(endpoint, data) {
    const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
    });
    return handleResponse(response);
}

export async function apiPut(endpoint, data) {
    const response = await fetch(`${API_URL}${endpoint}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
    });
    return handleResponse(response);
}

export async function apiDelete(endpoint) {
    const response = await fetch(`${API_URL}${endpoint}`, {
        method: "DELETE",
        headers: getAuthHeaders()
    });
    return handleResponse(response);
}