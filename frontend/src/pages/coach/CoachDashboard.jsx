/**
 * ============================================================
 *  COACH DASHBOARD: CoachDashboard.jsx
 * 
 *  Panel principal del entrenador (COACH).
 *  Muestra:
 *    - Métricas básicas relacionadas con sus clases
 *    - Accesos rápidos a las secciones del coach
 * 
 *  Algunas métricas pueden ser simuladas si el backend
 *  todavía no expone datos específicos para el coach.
 * ============================================================
 */

import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaUserFriends, FaChalkboardTeacher } from "react-icons/fa";
import "../../styles/Dashboard.css";

export default function CoachDashboard() {
  const { usuario, loading } = useAuth();
  const [clases, setClases] = useState([]);
  const [alumnos, setAlumnos] = useState([]);

  useEffect(() => {
    if (loading) return;
    if (!usuario) return;
    if (usuario.rol !== "COACH") return;

    cargarDatos();
  }, [loading, usuario]);

  /**
   * ============================================================
   *  CARGA DE DATOS DEL COACH
   *  - Si el backend aún no tiene endpoints específicos,
   *    se pueden usar datos simulados o rutas genéricas.
   * ============================================================
   */
  const cargarDatos = async () => {
    try {
      // Cuando tengamos endpoints reales, sustituimos estas líneas:
      // const clasesData = await apiGet("/coaches/mis-clases");
      // const alumnosData = await apiGet("/coaches/mis-alumnos");

      // Simulación temporal:
      const clasesData = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const alumnosData = [{ id: 1 }, { id: 2 }];

      setClases(clasesData);
      setAlumnos(alumnosData);

    } catch (error) {
      console.error("Error cargando datos del coach:", error);
    }
  };

  /**
   * ======================================================
   *  RENDER CONDICIONAL
   * ======================================================
   */
  if (loading) return <p>Cargando...</p>;
  if (!usuario) return <p>No autorizado</p>;
  if (usuario.rol !== "COACH") return <p>No tienes permisos</p>;


  return (
    <div className="dashboard-container-fluid">

      <h1 className="fw-bold mb-4">Panel del Coach</h1>

      {/* ============================================================
          TARJETAS DE MÉTRICAS
      ============================================================ */}
      <div className="row g-4 mb-4">

        <div className="col-md-4">
          <div className="dashboard-card p-4 text-center">
            <FaCalendarAlt className="dashboard-icon mb-2" />
            <h3>{clases.length}</h3>
            <p>Clases asignadas</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="dashboard-card p-4 text-center">
            <FaUserFriends className="dashboard-icon mb-2" />
            <h3>{alumnos.length}</h3>
            <p>Alumnos activos</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="dashboard-card p-4 text-center">
            <FaChalkboardTeacher className="dashboard-icon mb-2" />
            <h3>{clases.length * 2}</h3>
            <p>Sesiones esta semana</p>
          </div>
        </div>

      </div>

      {/* ============================================================
          ACCESOS RÁPIDOS
      ============================================================ */}
      <div className="dashboard-card p-4">
        <h3 className="mb-3">
          <FaChalkboardTeacher /> Accesos rápidos
        </h3>

        <div className="d-flex flex-wrap gap-3">

          <Link to="/coach/clases" className="btn btn-primary">
            Mis clases
          </Link>

        </div>
      </div>

    </div>
  );
}
