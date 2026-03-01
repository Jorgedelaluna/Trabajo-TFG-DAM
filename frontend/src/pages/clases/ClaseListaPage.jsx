import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";

function fmt(d) {
  if (!d) return "—";
  try { return new Date(d).toLocaleString(); } catch { return d; }
}

export default function ClaseListaPage() {
  const [clases, setClases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    fechaHora: "",
    aforoMaximo: 20,
  });

  const load = async () => {
    setLoading(true);
    setErr("");
    setMsg("");
    try {
      const data = await api.get("/clases");
      setClases(Array.isArray(data) ? data : []);
    } catch (e) {
      setErr(e.message || "No se pudieron cargar clases");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const crear = async (e) => {
    e.preventDefault();
    setErr("");
    setMsg("");

    try {
      // datetime-local => "YYYY-MM-DDTHH:mm"
      const fechaHora =
        form.fechaHora && form.fechaHora.length === 16 ? `${form.fechaHora}:00` : form.fechaHora;

      await api.post("/clases", {
        nombre: form.nombre,
        descripcion: form.descripcion,
        fechaHora,
        aforoMaximo: Number(form.aforoMaximo),
      });

      setMsg("Clase creada ✅");
      setForm({ nombre: "", descripcion: "", fechaHora: "", aforoMaximo: 20 });
      await load();
    } catch (e2) {
      setErr(e2.message || "No se pudo crear la clase");
    }
  };

  const borrar = async (id) => {
    if (!window.confirm("¿Eliminar esta clase?")) return;
    setErr("");
    setMsg("");
    try {
      await api.del(`/clases/${id}`);
      setMsg("Clase eliminada ✅");
      await load();
    } catch (e) {
      setErr(e.message || "No se pudo eliminar");
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="fw-bold mb-3">Gestión de clases</h1>

      {msg && <div className="alert alert-success">{msg}</div>}
      {err && <div className="alert alert-danger">{err}</div>}

      <div className="card shadow-sm p-3 mb-4">
        <h5 className="fw-bold mb-3">Crear clase</h5>

        <form onSubmit={crear}>
          <div className="row g-2">
            <div className="col-md-4">
              <label className="form-label">Nombre</label>
              <input className="form-control" name="nombre" value={form.nombre} onChange={onChange} required />
            </div>

            <div className="col-md-4">
              <label className="form-label">Fecha y hora</label>
              <input className="form-control" type="datetime-local" name="fechaHora" value={form.fechaHora} onChange={onChange} required />
            </div>

            <div className="col-md-4">
              <label className="form-label">Aforo máximo</label>
              <input className="form-control" type="number" name="aforoMaximo" min="1" value={form.aforoMaximo} onChange={onChange} required />
            </div>

            <div className="col-12">
              <label className="form-label">Descripción</label>
              <textarea className="form-control" name="descripcion" rows="2" value={form.descripcion} onChange={onChange} />
            </div>

            <div className="col-12 d-grid">
              <button className="btn btn-primary">Crear</button>
            </div>
          </div>
        </form>
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
                <th>Nombre</th>
                <th>Fecha</th>
                <th>Aforo</th>
                <th className="text-end"></th>
              </tr>
            </thead>
            <tbody>
              {clases.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>
                    <Link to={`/clases-admin/${c.id}`} className="text-decoration-none">
                      {c.nombre}
                    </Link>
                  </td>
                  <td>{fmt(c.fechaHora)}</td>
                  <td>{c.aforoMaximo}</td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-outline-danger" onClick={() => borrar(c.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}

              {clases.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-muted">No hay clases todavía.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
