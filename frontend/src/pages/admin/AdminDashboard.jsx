/**
 * ======================================================
 *  ADMIN DASHBOARD: AdminDashboard.jsx
 * 
 *  Panel principal del administrador.
 *  Muestra:
 *    - Métricas globales del sistema (usuarios, clases, coaches)
 *    - Accesos rápidos a las secciones de gestión
 * 
 *  Las peticiones usan datos reales del backend.
 *  Si alguna falla, se controla el error para evitar caídas.
 * ======================================================
 */

import { useAuth } from "../../auth/AuthContext";
import { useEffect, useState } from "react";
import { apiGet } from "../../api/api";
import { FaUsers, FaCalendarAlt, FaChalkboardTeacher, FaUserShield } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../styles/Dashboard.css";

export default function AdminDashboard() {
  const { usuario, loading } = useAuth();

  // Estados
  const [usuarios, setUsuarios] = useState([]);
  const [clases, setClases] = useState([]);
  const [coaches, setCoaches] = useState([]);

  // Cargar datos solo cuando usuario está listo y es admin
  useEffect(() => {
    if (loading) return;
    if (!usuario) return;
    if (usuario.rol !== "ADMIN") return;

    cargarDatos();
  }, [loading, usuario]);

    /**
   * ============================================================
   *  CARGA DE DATOS DESDE EL BACKEND
   *  - Se usa try/catch para evitar errores en el dashboard
   *  - Las rutas deben coincidir con el backend real
   * ============================================================
   */
  const cargarDatos = async () => {
    try {
      const [usuariosData, clasesData, coachesData] = await Promise.all([
        apiGet("/usuarios"),
        apiGet("/clases"),
        apiGet("/coaches")
      ]);

      setUsuarios(usuariosData);
      setClases(clasesData);
      setCoaches(coachesData);

    } catch (error) {
      console.error("Error cargando datos del dashboard:", error);
    }
  };

  // Render condicional
  if (loading) return <p>Cargando...</p>;
  if (!usuario) return <p>No autorizado</p>;
  if (usuario.rol !== "ADMIN") return <p>No tienes permisos</p>;

  return (
    <div className="dashboard-container-fluid">

      <h1 className="fw-bold mb-4">Panel de Administración</h1>

      {/* ============================================
          TARJETAS DE MÉTRICAS
      ============================================ */}
      <div className="row g-4 mb-4">

        <div className="col-md-4">
          <div className="dashboard-card p-4 text-center">
            <FaUsers className="dashboard-icon mb-2" />
            <h3>{usuarios.length}</h3>
            <p>Total de usuarios</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="dashboard-card p-4 text-center">
            <FaCalendarAlt className="dashboard-icon mb-2" />
            <h3>{clases.length}</h3>
            <p>Clases programadas</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="dashboard-card p-4 text-center">
            <FaChalkboardTeacher className="dashboard-icon mb-2" />
            <h3>{coaches.length}</h3>
            <p>Coaches activos</p>
          </div>
        </div>

      </div>

      {/* ============================================
          ACCESOS RÁPIDOS
      ============================================ */}
      <div className="dashboard-card p-4">
        <h3 className="mb-3">
          <FaUserShield /> Accesos rápidos
        </h3>

        <div className="d-flex flex-wrap gap-3">

          <Link to="/admin/usuarios" className="btn btn-primary">
            Gestión de usuarios
          </Link>

          <Link to="/admin/clases" className="btn btn-primary">
            Gestión de clases
          </Link>

          <Link to="/admin/coaches" className="btn btn-primary">
            Gestión de coaches
          </Link>

        </div>
      </div>

    </div>
  );
}
