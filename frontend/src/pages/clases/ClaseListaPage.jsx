/**
 * ======================================================
 *  LISTA DE CLASES (ADMIN / COACH)
 *  - Muestra todas las clases registradas en el sistema
 *  - Permite editar o eliminar una clase
 *  - Accesible solo para ADMIN y COACH (controlado en App.jsx)
 * ======================================================
 */

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ClaseListaPage() {
  const [clases, setClases] = useState([]);
  const [cargando, setCargando] = useState(true);

  /**
   * ======================================================
   *  CARGAR LISTA DE CLASES DESDE EL BACKEND
   * ======================================================
   */
  useEffect(() => {
    const cargarClases = async () => {
      try {
        const response = await axios.get("http://localhost:8080/clases");
        setClases(response.data);
      } catch (error) {
        console.error("Error cargando clases:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarClases();
  }, []);

  /**
   * ======================================================
   *  ELIMINAR CLASE
   * ======================================================
   */
  const eliminarClase = async (id) => {
    const confirmar = window.confirm("¿Seguro que quieres eliminar esta clase?");
    if (!confirmar) return;

    try {
      await axios.delete(`http://localhost:8080/clases/${id}`);

      // Actualizar lista local
      setClases((prev) => prev.filter((c) => c.id !== id));

      alert("Clase eliminada correctamente");
    } catch (error) {
      console.error("Error eliminando clase:", error);
      alert("No se pudo eliminar la clase");
    }
  };

  /**
   * ======================================================
   *  ESTADO DE CARGA
   * ======================================================
   */
  if (cargando) {
    return (
      <div className="text-center text-light mt-5">
        <h3>Cargando clases...</h3>
      </div>
    );
  }

  /**
   * ======================================================
   *  RENDER PRINCIPAL
   * ======================================================
   */
  return (
    <section className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-light fw-bold">Gestión de Clases</h1>

        {/* Botón para crear nueva clase */}
        <Link to="/clases-admin/nueva" className="btn btn-primary">
          + Nueva Clase
        </Link>
      </div>

      {clases.length === 0 ? (
        <p className="text-light opacity-75">No hay clases registradas.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-dark table-striped align-middle">
            <thead>
              <tr>
                <th>Actividad</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Aforo</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {clases.map((clase) => (
                <tr key={clase.id}>
                  <td>{clase.actividad}</td>
                  <td>{new Date(clase.fechaHora).toLocaleDateString()}</td>
                  <td>
                    {new Date(clase.fechaHora).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td>{clase.aforo}</td>

                  <td className="text-end">
                    <Link
                      to={`/clases-admin/${clase.id}`}
                      className="btn btn-sm btn-warning me-2"
                    >
                      Editar
                    </Link>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => eliminarClase(clase.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </section>
  );
}
