/**
 * ============================================================
 *  P�GINA ADMIN / COACH: ClaseNuevaPage.jsx
 * 
 *  Vista para crear una nueva clase en el sistema.
 *  Funcionalidades:
 *    - Formulario completo para actividad, fecha, hora y aforo
 *    - Envía los datos al backend para crear la clase
 *    - Accesible solo para ADMIN y COACH (controlado en App.jsx)
 * 
 *  Esta página forma parte del panel de administración y se
 *  integra con AdminLayout y el estilo glass del dashboard.
 * ============================================================
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../styles/Dashboard.css";
import API_URL from "../../../api/api";

export default function ClaseNuevaPage() {

  const navigate = useNavigate();

  // Estado inicial del formulario
  const [clase, setClase] = useState({
    actividad: "",
    fecha: "",
    hora: "",
    aforo: 10
  });

  /**
   * ============================================================
   *  Crear nueva clase en el backend
   * ============================================================
   */
  const crearClase = async (e) => {
    e.preventDefault();

    try {
      // Construir fechaHora en formato ISO
      const fechaHora = `${clase.fecha}T${clase.hora}:00`;

        await axios.post(`${API_URL}/clases`, {
        actividad: clase.actividad,
        fechaHora: fechaHora,
        aforo: clase.aforo
      });

      alert("Clase creada correctamente");
      navigate("/admin/clases");

    } catch (error) {
      console.error("Error creando clase:", error);
      alert("No se pudo crear la clase");
    }
  };

  /**
   * ============================================================
   *  Render principal
   * ============================================================
   */
  return (
    <div className="dashboard-container-fluid">

      <h1 className="fw-bold mb-4">Crear Nueva Clase</h1>

      <div className="dashboard-card p-4">

        <form onSubmit={crearClase} className="row g-3">

          {/* Actividad */}
          <div className="col-md-6">
            <label className="form-label">Actividad</label>
            <input
              type="text"
              className="form-control"
              value={clase.actividad}
              onChange={(e) =>
                setClase({ ...clase, actividad: e.target.value })
              }
              required
            />
          </div>

          {/* Fecha */}
          <div className="col-md-3">
            <label className="form-label">Fecha</label>
            <input
              type="date"
              className="form-control"
              value={clase.fecha}
              onChange={(e) =>
                setClase({ ...clase, fecha: e.target.value })
              }
              required
            />
          </div>

          {/* Hora */}
          <div className="col-md-3">
            <label className="form-label">Hora</label>
            <input
              type="time"
              className="form-control"
              value={clase.hora}
              onChange={(e) =>
                setClase({ ...clase, hora: e.target.value })
              }
              required
            />
          </div>

          {/* Aforo */}
          <div className="col-md-3">
            <label className="form-label">Aforo</label>
            <input
              type="number"
              className="form-control"
              value={clase.aforo}
              onChange={(e) =>
                setClase({ ...clase, aforo: Number(e.target.value) })
              }
              required
            />
          </div>

          {/* Botones */}
          <div className="col-12 mt-4">
            <button type="submit" className="btn btn-primary me-2">
              Crear clase
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/admin/clases")}
            >
              Cancelar
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
