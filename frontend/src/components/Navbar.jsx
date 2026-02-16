import { Link } from "react-router-dom";
import { useAuth } from "../authTemp/AuthContext";

function Navbar() {
  const { token, usuario, logout } = useAuth();
  const rol = usuario?.rol; // Extrae el rol del usuario logueado

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm navbar-section fixed-top">
      <div className="container">

        {/* LOGO */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src="../../logo_pequeño_crossfit_manager_app.png"
            alt="Logo"
            style={{ height: "40px", marginRight: "10px" }}
            />
          <span className="fw-bold">CROSSFIT MANAGER</span>
        </Link>

        {/* Botón hamburguesa móvil */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenido del menú */}
        <div className="collapse navbar-collapse" id="navbarNav">

          {/* Enlaces principales */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/clases">Clases</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/horarios">Horarios</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/precios">Precios</Link>
            </li>

            {/* ADMIN */}
            {rol === "ADMIN" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard-admin">Admin</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/usuarios">Usuarios</Link>
                </li>
              </>
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
          </ul>

          {/* Botones a la derecha */}
          <div className="d-flex">

            {/* Si NO está logueado → mostrar Acceder */}
            {!token && (
              <>
                <Link to="/login" className="btn btn-outline-light me-2">
                  Iniciar Sesión
                </Link>

                <Link to="/registro" className="btn btn-primary">
                  Registrarse
                </Link>
              </>
            )}

            {/* Si está logueado → mostrar Cerrar sesión */}
            {token && (
              <button
                className="btn btn-danger ms-2"
                onClick={logout}
              >
                Cerrar sesión
              </button>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;

