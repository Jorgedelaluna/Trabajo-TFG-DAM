import React, { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useAuth } from "../../authTemp/AuthContext";

function fmt(d) {
  if (!d) return "—";
  try { return new Date(d).toLocaleString(); } catch { return d; }
}

export default function ReservaListaPage() {
  const { usuario } = useAuth();
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    setErr("");
    try {
      const data = await api.get(`/inscripciones/usuario/${usuario.id}`);
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      setErr(e.message || "No se pudieron cargar inscripciones");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const cancelar = async (id) => {
    setMsg("");
    setErr("");
    try {
      await api.put(`/inscripciones/${id}/cancelar`, {});
      setMsg("Inscripción cancelada ✅");
      await load();
    } catch (e) {
      setErr(e.message || "No se pudo cancelar");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Mis inscripciones</h2>

      {msg && <div className="alert alert-success">{msg}</div>}
      {err && <div className="alert alert-danger">{err}</div>}

      <button className="btn btn-outline-secondary mb-3" onClick={load}>Recargar</button>

      {loading ? (
        <div>Cargando...</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Clase</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th className="text-end"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={i.id}>
                  <td>{i.id}</td>
                  <td>{i.claseNombre ?? i.claseId ?? "—"}</td>
                  <td>{i.estado ?? "—"}</td>
                  <td>{fmt(i.fechaInscripcion)}</td>
                  <td className="text-end">
                    <button
                      className="btn btn-sm btn-outline-danger"
                      disabled={(i.estado || "").toUpperCase() === "CANCELADA"}
                      onClick={() => cancelar(i.id)}
                    >
                      Cancelar
                    </button>
                  </td>
                </tr>
              ))}

              {items.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-muted">No tienes inscripciones</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
