import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../services/api";

export default function UsuarioDetallePage() {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [estadoCuota, setEstadoCuota] = useState("ACTIVA");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    setErr("");
    setMsg("");
    try {
      const data = await api.get("/usuarios");
      const lista = Array.isArray(data) ? data : [];
      const encontrado = lista.find((u) => String(u.id) === String(id));
      setUsuario(encontrado || null);
      setEstadoCuota((encontrado?.estadoCuota || "ACTIVA").toString());
    } catch (e) {
      setErr(e.message || "No se pudo cargar el usuario");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  const actualizarCuota = async () => {
    setErr("");
    setMsg("");
    try {
      const actualizado = await api.put(`/usuarios/${id}/cuota?estado=${estadoCuota}`, {});
      setUsuario(actualizado);
      setMsg("Estado de cuota actualizado ✅");
    } catch (e) {
      setErr(e.message || "No se pudo actualizar la cuota");
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="fw-bold mb-3">Detalle usuario</h1>
        <Link className="btn btn-outline-secondary" to="/usuarios">
          Volver
        </Link>
      </div>

      {msg && <div className="alert alert-success">{msg}</div>}
      {err && <div className="alert alert-danger">{err}</div>}

      {loading ? (
        <div>Cargando...</div>
      ) : !usuario ? (
        <div className="text-muted">Usuario no encontrado.</div>
      ) : (
        <div className="card shadow-sm p-3" style={{ maxWidth: 800 }}>
          <div className="mb-2"><b>ID:</b> {usuario.id}</div>
          <div className="mb-2"><b>Nombre:</b> {usuario.nombre}</div>
          <div className="mb-2"><b>Email:</b> {usuario.email}</div>
          <div className="mb-2"><b>Rol:</b> {usuario.rol}</div>
          <div className="mb-3"><b>Estado cuota:</b> {usuario.estadoCuota ?? "—"}</div>

          <hr />

          <div className="row g-2 align-items-end">
            <div className="col-md-6">
              <label className="form-label">Cambiar estado cuota</label>
              <select
                className="form-select"
                value={estadoCuota}
                onChange={(e) => setEstadoCuota(e.target.value)}
              >
                <option value="ACTIVA">ACTIVA</option>
                <option value="INACTIVA">INACTIVA</option>
              </select>
            </div>

            <div className="col-md-6 d-grid">
              <button className="btn btn-primary" onClick={actualizarCuota}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
