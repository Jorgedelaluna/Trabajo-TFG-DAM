/**
 * ============================================
 *  SIDEBAR PRIVADO
 *  - Navegación lateral para usuarios logueados
 *  - Muestra opciones según el rol del usuario
 *  - Coherente con las rutas definidas en App.jsx
 * ============================================
 */

import { Link } from "react-router-dom";
import { useAuth } from "../authTemp/AuthContext";

export default function Sidebar() {
  const { usuario, logout } = useAuth();
  const rol = usuario?.rol;

  // Si el usuario aún no está cargado, no mostramos nada
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
      <h4 className="fw-bold mb-4">Panel</h4>

      <ul className="nav flex-column">

        {/* ============================================
            OPCIONES COMUNES (todos los roles)
            - Se reutilizan algunos enlaces aunque estén en el NavBar
            para mejorar la usabilidad dentro del panel
        ============================================ */}

        <li className="nav-item mb-2">
          <Link className="nav-link text-light" to="/dashboard">
            Dashboard
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-light" to="/perfil">
            Mi Perfil
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-light" to="/clases">
            Clases
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-light" to="/mis-reservas">
            Mis Reservas
          </Link>
        </li>

        {/* ============================================
            ADMINISTRACIÓN (solo ADMIN)
        ============================================ */}
        {rol === "ADMIN" && (
          <>
            <li className="nav-item mb-2">
              <Link className="nav-link text-light" to="/usuarios">
                Gestión de Usuarios
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link text-light" to="/clases-admin">
                Gestión de Clases
              </Link>
            </li>
          </>
        )}

        <hr className="text-secondary" />

        {/* ============================================
            COACH (solo COACH)
        ============================================ */}
        {rol === "COACH" && (
          <li className="nav-item mb-2">
            <Link className="nav-link text-light" to="/clases-admin">
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
