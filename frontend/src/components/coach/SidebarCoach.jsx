/**
 * ============================================================
 *  SIDEBAR COACH: SidebarCoach.jsx
 * 
 *  Navegación lateral exclusiva para entrenadores (COACH).
 *  Aquí se agrupan los accesos directos a las secciones internas
 *  del panel del coach.
 * 
 *  Este panel es independiente del usuario y del administrador,
 *  manteniendo una navegación clara para cada rol.
 * ============================================================
 */

import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

export default function SidebarCoach() {
  const { usuario, logout } = useAuth();

  // Si el usuario aún no está cargado o no es coach, no mostramos nada
  if (!usuario || usuario.rol !== "COACH") return null;

  return (
    <aside
      className="bg-dark text-light p-3"
      style={{
        width: "250px",
        minHeight: "100vh",
        borderRight: "1px solid rgba(255,255,255,0.1)"
      }}
    >
      {/* Título del panel */}
      <h2 className="fw-bold mb-4">COACH</h2>

      {/* Navegación principal del coach */}
      <ul className="nav flex-column">

        {/* ============================================
            OPCIONES PARA EL COACH
        ============================================ */}
        
        {/* Panel principal */}
        <li className="nav-item mb-2">
          <Link className="nav-link text-light" to="/coach/dashboard">
            Dashboard
          </Link>
        </li>

        {/* Gestión de clases del coach */}
        <li className="nav-item mb-2">
          <Link className="nav-link text-light" to="/coach/clases">
            Mis Clases
          </Link>
        </li>

      </ul>

      {/* Botón cerrar sesión */}
      <button
        className="btn btn-outline-light w-100 mt-4"
        onClick={logout}
      >
        Cerrar sesión
      </button>
    </aside>
  );
}
