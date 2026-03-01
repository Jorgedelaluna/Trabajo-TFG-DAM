import React from "react";
import { useAuth } from "../../authTemp/AuthContext";

export default function PerfilPage() {
  const { usuario } = useAuth();

  return (
    <div className="container mt-4">
      <h2>Mi perfil</h2>

      <div className="card p-3 mt-3" style={{ maxWidth: 650 }}>
        <div><b>ID:</b> {usuario?.id ?? "—"}</div>
        <div><b>Nombre:</b> {usuario?.nombre ?? "—"}</div>
        <div><b>Email:</b> {usuario?.email ?? "—"}</div>
        <div><b>Rol:</b> {usuario?.rol ?? usuario?.tipoUsuario ?? "—"}</div>
      </div>
    </div>
  );
}
