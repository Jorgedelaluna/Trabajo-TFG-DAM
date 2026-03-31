/**
 * ============================================================
 *  COACH - DETALLE DE CLASE
 * 
 *  Muestra información detallada de una clase asignada al coach.
 * ============================================================
 */

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../../../styles/Dashboard.css";

export default function CoachClaseDetallePage() {
  const { id } = useParams();
  const [clase, setClase] = useState(null);

  useEffect(() => {
    // Simulación temporal (reemplazar por apiGet cuando esté listo)
    const data = {
      id,
      actividad: "CrossFit",
      fecha: "2026-03-30",
      hora: "09:00",
      aforo: 20,
      descripcion: "Sesión de Crossfit."
    };

    setClase(data);
  }, [id]);


  if (!clase) return <p>Cargando...</p>;

  return (
    <div className="dashboard-container-fluid">

      <h1 className="fw-bold mb-4">Detalle de Clase</h1>

      <div className="dashboard-card p-4">

        <p><strong>Actividad:</strong> {clase.actividad}</p>
        <p><strong>Fecha:</strong> {clase.fecha}</p>
        <p><strong>Hora:</strong> {clase.hora}</p>
        <p><strong>Aforo:</strong> {clase.aforo}</p>
        <p><strong>Descripción:</strong> {clase.descripcion}</p>

        <Link to="/coach/clases" className="btn btn-secondary mt-3">
          Volver a mis clases
        </Link>

      </div>

    </div>
  );
}
