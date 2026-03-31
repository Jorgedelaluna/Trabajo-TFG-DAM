/**
 * ======================================================
 *  PÁGINA ADMIN: UsuarioListaPage.jsx
 * 
 *  Vista principal para la gestión de usuarios.
 *  Funcionalidades:
 *    - Carga real de usuarios desde el backend
 *    - Tabla con datos clave (nombre, email, rol, cuota)
 *    - Acceso directo al detalle de cada usuario
 * 
 *  Esta página forma parte del panel de administración y se
 *  integra con AdminLayout y el estilo glass del dashboard.
 * ======================================================
 */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../../styles/Dashboard.css";

export default function UsuarioListaPage() {

  // Lista de usuarios obtenidos del backend
  const [usuarios, setUsuarios] = useState([]);

  /**
   * ============================================================
   *  Cargar usuarios al montar el componente
   * ============================================================
   */
  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const res = await axios.get("http://localhost:8080/usuarios");
      setUsuarios(res.data);
    } catch (error) {
      console.error("Error cargando usuarios:", error);
    }
  };

  return (
    <div className="dashboard-container-fluid">

      {/* Titulo principal */}
      <h1 className="fw-bold mb-4">Gestión de Usuarios</h1>

      {/* Tarjeta principal */}
      <div className="dashboard-card p-4">

        {/* Tabla de usuarios*/}
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Cuota</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {/* Si no hay usuarios */}
            {usuarios.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No hay usuarios registrados.
                </td>
              </tr>
            )}

            {/* Listado real */}
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td>{u.nombre}</td>
                <td>{u.email}</td>
                <td>{u.rol}</td>
                <td>{u.cuota}</td>

                <td>
                  <Link
                    to={`/admin/usuarios/${u.id}`}
                    className="btn btn-primary btn-sm"
                  >
                    Ver detalle
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}
