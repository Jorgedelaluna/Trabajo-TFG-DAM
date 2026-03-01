import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../authTemp/AuthContext";
import { api } from "../../services/api";

function fmt(d) {
  if (!d) return "—";
  try { return new Date(d).toLocaleString(); } catch { return d; }
}

export default function ReservaListaPage() {
  const { usuario } = useAuth();

  const [clases, setClases] = useState([]);
  const [inscripciones, setInscripciones] = useState([]);
  const [claseId, setClaseId] = useState("");

  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const clasesById = useMemo(() => {
    const m = new Map();
    clases.forEach((c) => m.set(c.id, c));
    return m;
  }, [clases]);

  const load = async () => {
    if (!usuario?.id) return;
    setLoading(true);
    setErr("");
    setMsg("");
    try {
      const [c, i] = await Promise.all([
        api.get("/clases"),
        api.get(`/inscripciones/usuario/${usuario.id}`),
      ]);
      setClases(Array.isArray(c) ? c : []);
      setInscripciones(Array.isArray(i) ? i : []);
    } catch (e) {
      setErr(e.message || "No se pudo cargar la información");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, [usuario?.id]);

  const inscribir = async () => {
    setErr("");
    setMsg("");
    if (!claseId) {
      setErr("Selecciona una clase.");
      return;
    }
    try {
      await api.post("/inscripciones", {
        usuarioId: usuario.id,
        claseId: Number(claseId),
      });
      setMsg("Inscripción realizada ✅");
      setClaseId("");
      await load();
    } catch (e) {
      setErr(e.message || "No se pudo inscribir");
    }
  };

  const cancelar = async (id) => {
    setErr("");
    setMsg("");
    try {
      await api.put(`/inscripciones/${id}/cancelar`, {});
      setMsg("Inscripción cancelada ✅");
      await load();
    } catch (e) {
      setErr(e.message || "No se pudo cancelar");
    }
  };

  if (!usuario) {
    return (
      <div className="container mt-4">
        <div>Cargando...</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="fw-bold mb-3">Reservas / Inscripciones</h1>

      {msg && <div className="alert alert-success">{msg}</div>}
      {err && <div className="alert alert-danger">{err}</div>}

      <div className="card shadow-sm p-3 mb-4">
        <h5 className="fw-bold mb-3">Inscribirme a una clase</h5>

        <div className="row g-2 align-items-end">
          <div className="col-md-8">
            <label className="form-label">Clase</label>
            <select
              className="form-select"
              value={claseId}
              onChange={(e) => setClaseId(e.target.value)}
            >
              <option value="">-- Selecciona --</option>
              {clases.map((c) => (
                <option key={c.id} value={c.id}>
                  #{c.id} - {c.nombre} ({fmt(c.fechaHora)})
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4 d-grid">
            <button className="btn btn-primary" onClick={inscribir} disabled={!clases.length}>
              Inscribirme
            </button>
          </div>
        </div>
      </div>

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
                <th>Clase</th>
                <th>Estado</th>
                <th>Fecha inscripción</th>
                <th className="text-end"></th>
              </tr>
            </thead>
            <tbody>
              {inscripciones.map((i) => {
                const c = clasesById.get(i.claseId);
                return (
                  <tr key={i.id}>
                    <td>{i.id}</td>
                    <td>{c ? `${c.nombre} (#${c.id})` : `Clase #${i.claseId}`}</td>
                    <td>{i.estado}</td>
                    <td>{fmt(i.fechaInscripcion)}</td>
                    <td className="text-end">
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => cancelar(i.id)}
                        disabled={(i.estado || "").toUpperCase() === "CANCELADA"}
                      >
                        Cancelar
                      </button>
                    </td>
                  </tr>
                );
              })}

              {inscripciones.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-muted">
                    No tienes inscripciones todavía.
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
