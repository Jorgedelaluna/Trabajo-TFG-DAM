import { apiGet } from "./api";

export function getUsuarios() {
  return apiGet("/usuarios");
}