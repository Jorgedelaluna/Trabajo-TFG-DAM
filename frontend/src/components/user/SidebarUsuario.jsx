/**
 * ============================================
 *  SIDEBAR USUARIO: SidebarUsuario.jsx
 * 
 *  Navegación lateral para usuarios logueados.
 *  Muestra accesos directos a las secciones privadas del usuario.
 * 
 *  Las rutas están alineadas con App.jsx para mantener coherencia.
 * ============================================
 */

import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

export default function SidebarUsuario() {
  const { usuario, loading, logout } = useAuth();
  const rol = usuario?.rol;

  // Si el usuario aún no está cargado, no mostramos nada
  if (loading) return null;
  if (!usuario) return null;

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
      <h4 className="fw-bold mb-4">Mi Panel</h4>

      {/* Navegación principal del usuario */}
      <ul className="nav flex-column">

        {/* ============================================
            OPCIONES COMUNES PARA EL USUARIO
        ============================================ */}

        {/* Dashboard */}
        <li className="nav-item mb-2">
          <Link className="nav-link text-light" to="/user/dashboard">
            Dashboard
          </Link>
        </li>

        {/* Perfil */}
        <li className="nav-item mb-2">
          <Link className="nav-link text-light" to="/user/perfil">
            Mi Perfil
          </Link>
        </li>

        {/* Clases disponibles */}
        <li className="nav-item mb-2">
          <Link className="nav-link text-light" to="/user/clases">
            Clases
          </Link>
        </li>

        {/* Reservas del usuario */}
        <li className="nav-item mb-2">
          <Link className="nav-link text-light" to="/user/reservas">
            Mis Reservas
          </Link>
        </li>

        {/* ============================================
            OPCIONES PARA COACH (SOLO COACH)
        ============================================ */}
        {rol === "COACH" && (
          <li className="nav-item mb-2">
            <Link className="nav-link text-light" to="/coach/dashboard">
              Mis Clases
            </Link>
          </li>
        )}

      </ul>

        {/* ============================================
            BOTÓN CERRAR SESIÓN
        ============================================ */}
      <button
        className="btn btn-outline-light w-100 mt-4"
        onClick={logout}
      >
        Cerrar sesión
      </button>
    </aside>
  );
}
