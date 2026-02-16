import { Link } from "react-router-dom";
import { useAuth } from "../../authTemp/AuthContext";

export default function Sidebar() {
  const { usuario } = useAuth();
  const rol = usuario?.rol;

  return (
    <div className="sidebar bg-dark text-light p-3" style={{ width: "250px", minHeight: "100vh" }}>
      <h4 className="fw-bold mb-4">Panel</h4>

      <ul className="nav flex-column">

        {/* Dashboard según rol */}
        {rol === "ADMIN" && (
          <li className="nav-item mb-2">
            <Link className="nav-link text-light" to="/dashboard-admin">Dashboard Admin</Link>
          </li>
        )}

        {rol === "COACH" && (
          <li className="nav-item mb-2">
            <Link className="nav-link text-light" to="/dashboard-coach">Dashboard Coach</Link>
          </li>
        )}

        {rol === "USER" && (
          <li className="nav-item mb-2">
            <Link className="nav-link text-light" to="/dashboard-user">Mi Panel</Link>
          </li>
        )}

        {/* Opciones según rol */}
        {rol === "ADMIN" && (
          <>
            <li className="nav-item mb-2">
              <Link className="nav-link text-light" to="/usuarios">Usuarios</Link>
            </li>
            <li className="nav-item mb-2">
              <Link className="nav-link text-light" to="/clases">Clases</Link>
            </li>
          </>
        )}

        {rol === "COACH" && (
          <li className="nav-item mb-2">
            <Link className="nav-link text-light" to="/clases">Mis clases</Link>
          </li>
        )}

        {(rol === "USER" || rol === "COACH" || rol === "ADMIN") && (
          <>
            <li className="nav-item mb-2">
              <Link className="nav-link text-light" to="/reservas">Reservas</Link>
            </li>
            <li className="nav-item mb-2">
              <Link className="nav-link text-light" to="/perfil">Mi perfil</Link>
            </li>
          </>
        )}

      </ul>
    </div>
  );
}
