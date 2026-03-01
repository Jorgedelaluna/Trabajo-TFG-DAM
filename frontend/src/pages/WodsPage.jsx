import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Link } from "react-router-dom";

export default function WodsPage() {
  const [wods, setWods] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setError("");
        const data = await api.get("/wods");
        const list = Array.isArray(data) ? data : (data?.content || data?.data || []);
        setWods(list);
      } catch (e) {
        setError("No se pudieron cargar los WODs.");
      }
    })();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-3">WODs</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card shadow-sm">
        <div className="table-responsive">
          <table className="table mb-0">
            <thead>
              <tr>
                <th style={{ width: 80 }}>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th style={{ width: 140 }}></th>
              </tr>
            </thead>
            <tbody>
              {wods.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-muted">
                    No hay WODs todavía.
                  </td>
                </tr>
              ) : (
                wods.map((w) => (
                  <tr key={w.id}>
                    <td>{w.id}</td>
                    <td>{w.nombre ?? w.name ?? "-"}</td>
                    <td>{w.descripcion ?? w.description ?? "-"}</td>
                    <td className="text-end">
                      <Link className="btn btn-outline-primary btn-sm" to={`/wods/${w.id}`}>
                        Ver
                      </Link>
                    </td>
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