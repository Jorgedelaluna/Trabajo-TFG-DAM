/**
 * ============================================================
 *  P�GINA ADMIN: CoachDetallePage.jsx
 * 
 *  Muestra la información completa de un coach.
 *  Accesible solo para ADMIN.
 * ============================================================
 */

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../../../styles/Dashboard.css";
import API_URL from "../../../api/api";


export default function CoachDetallePage() {

  const { id } = useParams();

  // Datos reales del coach
  const [coach, setCoach] = useState(null);

  /**
   * ============================================================
   * CARGAR LISTA DE COACH
   * Cargar coach al entrar en la página
   * ============================================================
   */
  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await axios.get(`${API_URL}/coaches/${id}`);
        setCoach(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    cargar();
  }, [id]);

  /**
   * ============================================================
   *  ESTADO DE CARGA
   * ============================================================
   */
  if (!coach) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-card p-4 text-center">
          <h3>Cargando coach...</h3>
        </div>
      </div>
    );
  }

  /**
   * ============================================================
   *  RENDER PRINCIPAL
   * ============================================================
   */
  return (
    <div className="dashboard-container">

      <h1 className="fw-bold mb-4">Detalle del Coach</h1>

      <div className="dashboard-card p-4">

        <p><strong>Nombre:</strong> {coach.nombre}</p>
        <p><strong>Email:</strong> {coach.email}</p>
        <p><strong>Especialidad:</strong> {coach.especialidad}</p>

        <Link to="/admin/coaches" className="btn btn-secondary mt-3">
          Volver
        </Link>

      </div>
    </div>
  );
}
