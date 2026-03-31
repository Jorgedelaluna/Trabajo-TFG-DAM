/**
 * ============================================
 *  NAVBAR PRINCIPAL
 *  - Muestra navegación pública y privada
 *  - Cambia según si el usuario está logueado
 *  - Incluye control por roles (ADMIN / COACH / USER)
 * ============================================
 */

import { Link } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

function Navbar() {
  const { token, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm navbar-section fixed-top">
      <div className="container">

        {/* ============================================
            LOGO + NOMBRE APP
        ============================================ */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="../../logo_pequeño_crossfit_manager_app.png"
            alt="Logo"
            style={{ height: "40px", marginRight: "10px" }}
          />
          <span className="fw-bold">CROSSFIT MANAGER</span>
        </Link>

        {/* Botón hamburguesa (móvil) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* ============================================
            CONTENIDO DEL MENÚ
        ============================================ */}
        <div className="collapse navbar-collapse" id="navbarNav">

          {/* ============================================
              ENLACES PARTE SUPERIOR IZQUIERDA (públicos + privados)
          ============================================ */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            {/* Páginas públicas */}
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

            {/* ============================================
                ENLACES PRIVADOS (solo si hay token)
            ============================================ */}
            
            {/* Enlaces privados del usuario normal */}
            {token && (
                <li className="nav-item">
                  <Link className="nav-link" to="/panel">Mi Panel</Link>
                </li>
            )}

          </ul>

          {/* ============================================
              BOTONES PARTE SUPERIOR DERECHA (login / registro / logout)
          ============================================ */}
          <div className="d-flex">

            {/* Si NO estás logueado -> Muestra Iniciar Sesión/Registrarse */}
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

            {/* Si estás logueado -> Muestra Cerrar Sesión */}
            {token && (
              <button className="btn btn-danger ms-2" onClick={logout}>
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
