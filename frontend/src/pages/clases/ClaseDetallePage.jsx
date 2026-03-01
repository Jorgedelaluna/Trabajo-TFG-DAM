/**
 * ======================================================
 *  DETALLE / EDICIÓN DE CLASE (ADMIN / COACH)
 *  - Muestra los datos de una clase concreta
 *  - Permite editar y guardar cambios
 *  - Accesible solo para ADMIN y COACH (controlado en App.jsx)
 * ======================================================
 */

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ClaseDetallePage() {
  const { id } = useParams(); // ID de la clase desde la URL
  const navigate = useNavigate();

  const [clase, setClase] = useState(null);
  const [cargando, setCargando] = useState(true);

  /**
   * ======================================================
   *  CARGAR DATOS DE LA CLASE
   * ======================================================
   */
  useEffect(() => {
    const cargarClase = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/clases/${id}`);
        setClase(response.data);
      } catch (error) {
        console.error("Error cargando clase:", error);
        alert("No se pudo cargar la clase");
      } finally {
        setCargando(false);
      }
    };

    cargarClase();
  }, [id]);

  /**
   * ======================================================
   *  GUARDAR CAMBIOS
   * ======================================================
   */
  const guardarCambios = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8080/clases/${id}`, clase);
      alert("Clase actualizada correctamente");
      navigate("/clases-admin");
    } catch (error) {
      console.error("Error actualizando clase:", error);
      alert("No se pudo actualizar la clase");
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
        <h3>Cargando clase...</h3>
      </div>
    );
  }

  if (!clase) {
    return (
      <div className="text-center text-light mt-5">
        <h3>No se encontró la clase</h3>
      </div>
    );
  }

  /**
   * ======================================================
   *  RENDER PRINCIPAL
   * ======================================================
   */
  return (
    <section className="container mt-4 text-light">
      <h1 className="fw-bold mb-4">Editar Clase</h1>

      <form onSubmit={guardarCambios} className="row g-3">

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
            value={clase.fechaHora?.split("T")[0]}
            onChange={(e) => {
              const nuevaFecha = e.target.value;
              const hora = clase.fechaHora.split("T")[1];
              setClase({ ...clase, fechaHora: `${nuevaFecha}T${hora}` });
            }}
            required
          />
        </div>

        {/* Hora */}
        <div className="col-md-3">
          <label className="form-label">Hora</label>
          <input
            type="time"
            className="form-control"
            value={clase.fechaHora?.split("T")[1].slice(0, 5)}
            onChange={(e) => {
              const nuevaHora = e.target.value;
              const fecha = clase.fechaHora.split("T")[0];
              setClase({ ...clase, fechaHora: `${fecha}T${nuevaHora}:00` });
            }}
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
            Guardar cambios
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/clases-admin")}
          >
            Cancelar
          </button>
        </div>

      </form>
    </section>
  );
}
