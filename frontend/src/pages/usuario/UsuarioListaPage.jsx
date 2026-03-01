import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";

export default function UsuarioListaPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    setErr("");
    try {
      const data = await api.get("/usuarios");
      setUsuarios(Array.isArray(data) ? data : []);
    } catch (e) {
      setErr(e.message || "No se pudieron cargar usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="fw-bold mb-3">Usuarios</h1>

      {err && <div className="alert alert-danger">{err}</div>}

      <button className="btn btn-outline-secondary mb-3" onClick={load}>
        Recargar
      </button>

      {loading ? (
        <div>Cargando...</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Cuota</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id}>
                  <td>
                    <Link to={`/usuarios/${u.id}`} className="text-decoration-none">
                      {u.id}
                    </Link>
                  </td>
                  <td>{u.nombre}</td>
                  <td>{u.email}</td>
                  <td>{u.rol}</td>
                  <td>{u.estadoCuota ?? "—"}</td>
                </tr>
              ))}

              {usuarios.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-muted">
                    No hay usuarios.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
