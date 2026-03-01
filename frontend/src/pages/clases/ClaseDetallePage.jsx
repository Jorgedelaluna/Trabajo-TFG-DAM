import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../services/api";

function fmt(d) {
  if (!d) return "—";
  try { return new Date(d).toLocaleString(); } catch { return d; }
}

export default function ClaseDetallePage() {
  const { id } = useParams();
  const [clase, setClase] = useState(null);
  const [inscripciones, setInscripciones] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    setErr("");
    try {
      const [c, ins] = await Promise.all([
        api.get(`/clases/${id}`),
        api.get(`/inscripciones/clase/${id}`),
      ]);
      setClase(c);
      setInscripciones(Array.isArray(ins) ? ins : []);
    } catch (e) {
      setErr(e.message || "No se pudo cargar la clase");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="fw-bold mb-3">Detalle clase</h1>
        <Link className="btn btn-outline-secondary" to="/clases-admin">
          Volver
        </Link>
      </div>

      {err && <div className="alert alert-danger">{err}</div>}

      {loading ? (
        <div>Cargando...</div>
      ) : !clase ? (
        <div className="text-muted">Clase no encontrada.</div>
      ) : (
        <>
          <div className="card shadow-sm p-3 mb-4" style={{ maxWidth: 900 }}>
            <div className="mb-2"><b>ID:</b> {clase.id}</div>
            <div className="mb-2"><b>Nombre:</b> {clase.nombre}</div>
            <div className="mb-2"><b>Fecha:</b> {fmt(clase.fechaHora)}</div>
            <div className="mb-2"><b>Aforo máximo:</b> {clase.aforoMaximo}</div>
            <div className="mb-2"><b>Descripción:</b> {clase.descripcion || "—"}</div>
          </div>

          <h4 className="fw-bold mb-2">Inscripciones</h4>

          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Usuario ID</th>
                  <th>Estado</th>
                  <th>Fecha inscripción</th>
                </tr>
              </thead>
              <tbody>
                {inscripciones.map((i) => (
                  <tr key={i.id}>
                    <td>{i.id}</td>
                    <td>{i.usuarioId}</td>
                    <td>{i.estado}</td>
                    <td>{fmt(i.fechaInscripcion)}</td>
                  </tr>
                ))}

                {inscripciones.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-muted">
                      No hay inscripciones para esta clase.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <button className="btn btn-outline-secondary" onClick={load}>
            Recargar
          </button>
        </>
      )}
    </div>
  );
}
