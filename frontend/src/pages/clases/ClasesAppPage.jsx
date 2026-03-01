import { useEffect, useState } from "react";
import { api } from "../../services/api";

function formatFecha(value) {
  if (!value) return "-";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleString();
}

export default function ClasesAppPage() {
  const [clases, setClases] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setError("");
        const data = await api.get("/clases");
        const list = Array.isArray(data) ? data : (data?.content || data?.data || []);
        setClases(list);
      } catch (e) {
        setError("No se pudieron cargar las clases.");
      }
    })();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-3">Clases</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card shadow-sm">
        <div className="table-responsive">
          <table className="table mb-0">
            <thead>
              <tr>
                <th style={{ width: 80 }}>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Fecha</th>
                <th style={{ width: 120 }}>Aforo</th>
                <th style={{ width: 120 }}>Coach</th>
              </tr>
            </thead>
            <tbody>
              {clases.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-muted">
                    No hay clases todavía.
                  </td>
                </tr>
              ) : (
                clases.map((c) => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.nombre ?? "-"}</td>
                    <td>{c.descripcion ?? "-"}</td>
                    <td>{formatFecha(c.fechaHora ?? c.fecha_hora ?? c.fecha)}</td>
                    <td>{c.aforoMaximo ?? c.aforo_maximo ?? "-"}</td>
                    <td>{c.coachId ?? c.coach_id ?? c.coach?.id ?? "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}