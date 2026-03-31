/**
 * ============================================================
 *  COACH - LISTA DE CLASES
 * 
 *  Muestra únicamente las clases asignadas al coach.
 *  Diseño coherente con el dashboard del coach.
 * ============================================================
 */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../styles/Dashboard.css";

export default function CoachClaseListaPage() {
  const [clases, setClases] = useState([]);

  useEffect(() => {
    // Simulación temporal
    setClases([
      { id: 1, actividad: "CrossFit", fecha: "2026-03-30", hora: "09:00", aforo: 12 },
      { id: 2, actividad: "HIIT", fecha: "2026-03-30", hora: "11:00", aforo: 10 },
      { id: 3, actividad: "Funcional", fecha: "2026-03-30", hora: "16:00", aforo: 15 }
    ]);
  }, []);

  return (
    <div className="dashboard-container-fluid">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold">Mis Clases</h1>
      </div>

      <div className="dashboard-card p-4">
        <table className="table table-dark table-striped align-middle">
          <thead>
            <tr>
              <th>Actividad</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Aforo</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {clases.map((clase) => (
              <tr key={clase.id}>
                <td>{clase.actividad}</td>
                <td>{clase.fecha}</td>
                <td>{clase.hora}</td>
                <td>{clase.aforo}</td>
                <td>
                  <Link
                    to={`/coach/clases/${clase.id}`}
                    className="btn btn-primary btn-sm"
                  >
                    Ver detalles
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}
