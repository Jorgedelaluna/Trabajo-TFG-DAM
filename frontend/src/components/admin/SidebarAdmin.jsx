/**
 * ======================================================
 *  SIDEBAR ADMIN: SidebarAdmin.jsx
 * 
 *  Navegación lateral exclusiva para administradores.
 *  Aquí se agrupan los accesos directos a las secciones internas
 *  del panel de administración.
 * 
 *  El estilo glass y las clases vienen de Dashboard.css.
 * ======================================================
 */

import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

export default function SidebarAdmin() {
  const { usuario, loading, logout } = useAuth();

  if (loading) return null;
  if (!usuario || usuario.rol !== "ADMIN") return null;

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
      <h2 className="fw-bold mb-4">ADMIN</h2>

      {/* Navegación principal del administrador */}
      <ul className="nav flex-column">

        {/* ============================================
            OPCIONES PARA EL ADMINISTRADOR
        ============================================ */}

        {/* Panel principal */}
        <li className="nav-item mb-2">
          <Link className="nav-link text-light" to="/admin/dashboard">
            Dashboard
          </Link>
        </li>

        {/* Gestión de usuarios */}
        <li className="nav-item mb-2">
          <Link className="nav-link text-light" to="/admin/usuarios">
            Usuarios
          </Link>
        </li>

        {/* Gestión de clases */}
        <li className="nav-item mb-2">
          <Link className="nav-link text-light" to="/admin/clases">
            Clases
          </Link>
        </li>

        {/* Gestión de actividades (NUEVO) */}
        <li className="nav-item mb-2">
          <Link className="nav-link text-light" to="/admin/actividades">
            Actividades
          </Link>
        </li>

        {/* Gestión de coaches */}
        <li className="nav-item mb-2">
          <Link className="nav-link text-light" to="/admin/coach">
            Coaches
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
