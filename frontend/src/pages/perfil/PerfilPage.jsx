import { useAuth } from "../../authTemp/AuthContext";

export default function PerfilPage() {
  const { usuario } = useAuth();

  if (!usuario) {
    return (
      <div className="container mt-4">
        <div>Cargando perfil...</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="fw-bold mb-3">Mi perfil</h1>

      <div className="card shadow-sm p-3" style={{ maxWidth: 800 }}>
        <div className="mb-2"><b>ID:</b> {usuario.id ?? "—"}</div>
        <div className="mb-2"><b>Nombre:</b> {usuario.nombre ?? "—"}</div>
        <div className="mb-2"><b>Email:</b> {usuario.email ?? "—"}</div>
        <div className="mb-2"><b>Rol:</b> {usuario.rol ?? "—"}</div>
        <div className="mb-2"><b>Estado cuota:</b> {usuario.estadoCuota ?? "—"}</div>
      </div>
    </div>
  );
}
