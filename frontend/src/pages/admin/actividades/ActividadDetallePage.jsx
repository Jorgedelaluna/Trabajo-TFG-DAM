/**
 * ============================================================
 *  PÁGINA ADMIN: ActividadDetallePage.jsx
 * 
 *  Edita una actividad existente.
 *  Carga los datos reales desde el backend.
 * ============================================================
 */

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../styles/Dashboard.css";

export default function ActividadDetallePage() {

  const { id } = useParams();
  const navigate = useNavigate();

  // Datos reales de la actividad
  const [actividad, setActividad] = useState(null);
  const [cargando, setCargando] = useState(true);


  /**
   * ======================================================
   * ESTADO DE CARGA
   * - Cargar actividad al entrar en la página
   * ======================================================
   */
  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/actividades/${id}`);
        setActividad(res.data);
      } catch (err) {
        console.error(err);
        alert("No se pudo cargar la actividad");
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, [id]);

  /**
   * ============================================================
   * GUARDAR CAMBIOS
   * - Se guardan los cambios
   * ============================================================
   */
  const guardar = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8080/actividades/${id}`, actividad);
      alert("Actividad actualizada");
      navigate("/admin/actividades");
    } catch (err) {
      console.error(err);
      alert("No se pudo actualizar");
    }
  };

  /**
   * ======================================================
   *  ESTADO DE CARGA
   * ======================================================
   */
  if (cargando) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-card p-4 text-center">
          <h3>Cargando actividad...</h3>
        </div>
      </div>
    );
  }

  if (!actividad) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-card p-4 text-center">
          <h3>No encontrada</h3>
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
    <div className="dashboard-container-fluid">

      <h1 className="fw-bold mb-4">Editar Actividad</h1>

      <div className="dashboard-card p-4">

        <form onSubmit={guardar} className="row g-3">

          {/* Nombre */}
          <div className="col-12">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              value={actividad.nombre}
              onChange={(e) => setActividad({ ...actividad, nombre: e.target.value })}
              required
            />
          </div>

          {/* Descripción */}
          <div className="col-12">
            <label className="form-label">Descripción</label>
            <textarea
              className="form-control"
              rows="3"
              value={actividad.descripcion}
              onChange={(e) => setActividad({ ...actividad, descripcion: e.target.value })}
            />
          </div>

          {/* Botones */}
          <div className="col-12 mt-3">
            <button className="btn btn-primary me-2">Guardar</button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/admin/actividades")}
            >
              Cancelar
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
