// ======================================================
// Archivo donde centralizamos todas las peticiones al backend.
// La idea es no repetir código en cada componente y tener aquí:
//   - La URL base del backend
//   - Los headers comunes (JSON + token si existe)
//   - El manejo de errores y respuestas
// ======================================================

// URL base del backend real
const API_URL =
    process.env.REACT_APP_API_URL || "http://localhost:8080"; 

export default API_URL;
// ======================================================
// Genera los headers comunes para cualquier petición.
// Si existe un token en localStorage, se añade automáticamente.
// Esto asegura que todas las rutas protegidas reciban la cabecera correcta.
// ======================================================
function getAuthHeaders() {
    const token = localStorage.getItem("token");

    const headers = {
        "Content-Type": "application/json"
    };
	
	// Si el usuario está autenticado, se añade el token al header
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }


    return headers;
}

// ======================================================
// Manejo común de respuestas del backend.
// - Si la respuesta no es correcta -> lanzamos un error con el mensaje.
// - Si es 204 (sin contenido) → devuelvo null.
// - Si todo va bien → devuelvo el JSON.
// Esto me permite tener un único punto de control de errores.
// ======================================================
async function handleResponse(response) {
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Error en la petición");
    }

	// Algunas peticiones (DELETE, PUT) pueden no devolver contenido
    if (response.status === 204) return null;

    return response.json();
}

// ======================================================
// Métodos HTTP genéricos.
// Cada uno construye la petición usando fetch y los headers comunes.
// Todos pasan por handleResponse() para unificar el manejo de errores.
// ======================================================

// GET: obtiene datos del backend
export async function apiGet(endpoint) {
    const response = await fetch(`${API_URL}${endpoint}`, {
        headers: getAuthHeaders()
    });
    return handleResponse(response);
}

// POST: envía datos al backend
export async function apiPost(endpoint, data) {
    const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
    });
    return handleResponse(response);
}

// PUT: actualiza un recurso existente
export async function apiPut(endpoint, data) {
    const response = await fetch(`${API_URL}${endpoint}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(data)
    });
    return handleResponse(response);
}

// DELETE: elimnina un recurso
export async function apiDelete(endpoint) {
    const response = await fetch(`${API_URL}${endpoint}`, {
        method: "DELETE",
        headers: getAuthHeaders()
    });
    return handleResponse(response);
}