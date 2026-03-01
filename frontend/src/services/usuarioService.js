// src/services/usuarioService.js
import { apiGet, apiPost, apiPut, apiDelete } from "../api/api";

export function obtenerUsuarios() {
  return apiGet("/usuarios");
}

export function crearUsuario(data) {
  return apiPost("/usuarios", data);
}

export function actualizarUsuario(id, data) {
  return apiPut(`/usuarios/${id}`, data);
}

export function eliminarUsuario(id) {
  return apiDelete(`/usuarios/${id}`);
}
