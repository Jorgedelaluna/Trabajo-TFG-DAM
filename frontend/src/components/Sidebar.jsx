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

        {/* Dashboard según rol */}
        {rol === "ADMIN" && (
          <li className="nav-item mb-2">
            <Link className="nav-link text-light" to="/dashboard-admin">
              Dashboard Admin
            </Link>
          </li>
        )}

        {rol === "COACH" && (
          <li className="nav-item mb-2">
            <Link className="nav-link text-light" to="/dashboard-coach">
              Dashboard Coach
            </Link>
          </li>
        )}

        {rol === "USER" && (
          <li className="nav-item mb-2">
            <Link className="nav-link text-light" to="/dashboard-user">
              Mi Panel
            </Link>
          </li>
        )}

        <hr className="text-secondary" />

        {/* Opciones según rol */}
        {rol === "ADMIN" && (
          <>
            <li className="nav-item mb-2">
              <Link className="nav-link text-light" to="/usuarios">
                Usuarios
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link className="nav-link text-light" to="/clases">
                Clases
              </Link>
            </li>
          </>
        )}

        {rol === "COACH" && (
          <li className="nav-item mb-2">
            <Link className="nav-link text-light" to="/clases">
              Mis clases
            </Link>
          </li>
        )}

        {/* Opciones comunes */}
        <li className="nav-item mb-2">
          <Link className="nav-link text-light" to="/reservas">
            Reservas
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link className="nav-link text-light" to="/perfil">
            Mi perfil
          </Link>
        </li>
      </ul>

      <button
        className="btn btn-outline-light w-100 mt-4"
        onClick={logout}
      >
        Cerrar sesión
      </button>
    </aside>
  );
}
