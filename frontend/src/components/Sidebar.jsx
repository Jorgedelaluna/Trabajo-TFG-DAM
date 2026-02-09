import { Link } from "react-router-dom";
import { useAuth } from "../authTemp/AuthContext";

export default function Sidebar() {
  const { usuario } = useAuth();
  const rol = usuario?.rol;

  return (
    <aside className="bg-light border-end" style={{ width: 220, height: "100vh" }}>
      <div className="p-3">
        <h5>Menú</h5>
        <ul className="nav flex-column">

          <li className="nav-item">
            <Link className="nav-link" to="/">Dashboard</Link>
          </li>

          {rol === "ADMIN" && (
            <li className="nav-item">
              <Link className="nav-link" to="/usuarios">Usuarios</Link>
            </li>
          )}

          {(rol === "ADMIN" || rol === "COACH") && (
            <li className="nav-item">
              <Link className="nav-link" to="/clases">Clases</Link>
            </li>
          )}

          <li className="nav-item">
            <Link className="nav-link" to="/reservas">Reservas</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/perfil">Mi Perfil</Link>
          </li>

        </ul>
      </div>
    </aside>
  );
}
