// src/services/claseService.js
import { apiGet, apiPost, apiPut, apiDelete } from "../api/api";

export function obtenerClases() {
  return apiGet("/clases");
}

export function actualizarClases(id, data) {
  return apiPut(`/clases/${id}`, data);
}

