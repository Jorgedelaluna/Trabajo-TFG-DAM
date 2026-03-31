/**
 * ============================================================
 *  PÁGINA ADMIN: ActividadListaPage.jsx
 * 
 *  Lista todas las actividades registradas en el sistema.
 *  Funcionalidades:
 *    - Carga real desde el backend
 *    - Permite editar o eliminar una actividad
 *    - Accesible solo para ADMIN (controlado en App.jsx)
 * 
 *  Forma parte del panel de administración y mantiene el
 *  estilo glass del dashboard.
 * ============================================================
 */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../../styles/Dashboard.css";

export default function ActividadListaPage() {

  // Lista de actividades obtenidas del backend
  const [actividades, setActividades] = useState([]);

  // Estado de carga inicial
  const [cargando, setCargando] = useState(true);

  /**
   * ============================================================
   * CARGAR LISTA DE ACTIVIDADES
   * - Cargar lista de actividades al montar el componente
   * ============================================================
   */
  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await axios.get("http://localhost:8080/actividades");
        setActividades(res.data);
      } catch (err) {
        console.error("Error cargando actividades:", err);
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, []);

  /**
   * ============================================================
   * ELIMINAR ACTIVIDAD
   * - Eliminar actividad en backend
   * ============================================================
   */
  const eliminarActividad = async (id) => {
    if (!window.confirm("¿Eliminar actividad?")) return;

    try {
      await axios.delete(`http://localhost:8080/actividades/${id}`);
      setActividades(prev => prev.filter(a => a.id !== id));
      alert("Actividad eliminada");
    } catch (err) {
      console.error(err);
      alert("No se pudo eliminar");
    }
  };

/**
   * ============================================================
   *  ESTADO DE CARGA
   * ============================================================
   */
  if (cargando) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-card p-4 text-center">
          <h3>Cargando actividades...</h3>
        </div>
      </div>
    );
  }

   /**
   * ======================================================
   *  RENDER PRINCIPAL
   * ======================================================
   */
  return (
    <div className="dashboard-container-´fluid">

      <div className="d-flex justify-content-between align-items-center mb-4">

        {/* Título + botón nueva actividad */}
        <h1 className="fw-bold">Gestión de Actividades</h1>
        <Link to="/admin/actividades/nueva" className="btn btn-primary">
          + Nueva Actividad
        </Link>
      </div>

      {/* Tarjeta principal */}
      <div className="dashboard-card p-4">

        {actividades.length === 0 ? (
          <p className="opacity-75">No hay actividades registradas.</p>
        ) : (
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {actividades.map((a) => (
                <tr key={a.id}>
                  <td>{a.nombre}</td>
                  <td>{a.descripcion}</td>

                  <td className="text-end">
                    <Link
                      to={`/admin/actividades/${a.id}`}
                      className="btn btn-warning btn-sm me-2"
                    >
                      Editar
                    </Link>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => eliminarActividad(a.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        )}

      </div>
    </div>
  );
}
