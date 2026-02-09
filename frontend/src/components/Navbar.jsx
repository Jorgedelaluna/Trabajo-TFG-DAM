import { Link } from "react-router-dom";
import { useAuth } from "../authTemp/AuthContext";

function Navbar() {
  const { token, usuario, logout } = useAuth();
  const rol = usuario?.rol; // Extrae el rol del usuario logueado

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">CrossFit App</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            {/* ADMIN */}
            {rol === "ADMIN" && (
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard-admin">Admin</Link>
              </li>
            )}

            {/* COACH */}
            {rol === "COACH" && (
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard-coach">Coach</Link>
              </li>
            )}

            {/* USER */}
            {rol === "USER" && (
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard-user">Mi Panel</Link>
              </li>
            )}

            {/* Ruta Usuarios (solo admin) */}
            {rol === "ADMIN" && (
              <li className="nav-item">
                <Link className="nav-link" to="/usuarios">Usuarios</Link>
              </li>
            )}

            {/* Si NO está logueado → mostrar Acceder */}
            {!token && (
              <li className="nav-item">
                <Link className="nav-link" to="/auth">Acceder</Link>
              </li>
            )}

            {/* Si está logueado → mostrar Cerrar sesión */}
            {token && (
              <li className="nav-item">
                <button
                  className="btn btn-danger ms-3"
                  onClick={logout}
                >
                  Cerrar sesión
                </button>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
