/**
 * ======================================================
 *  PÃ�GINA PRIVADA: ClasesUsuarioPage.jsx
 * 
 *  Muestra todas las clases disponibles para el usuario.
 *  Funcionalidades principales:
 *    - Filtrar clases por fecha mediante un input type="date"
 *    - Agrupar clases por dÃ­a de la semana en un accordion
 *    - Permitir reservar una clase (se guarda en el backend)
 *    - Actualizar automÃ¡ticamente MisReservas al reservar
 * 
 *  Esta pÃ¡gina es clave para la experiencia del usuario,
 *  ya que centraliza la bÃºsqueda y reserva de clases.
 * ======================================================
 */

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "../../styles/ClasesUsuario.css";
import { FaClock } from "react-icons/fa";
import API_URL from "../api/api";

export default function ClasesUsuarioPage() {

  // Estado donde guardamos todas las clases obtenidas del backend
  const [clases, setClases] = useState([]);

  // Reservas del usuario autenticado
  const [reservasUsuario, setReservasUsuario] = useState([]);

  // Mensaje informativo de Ã©xito/error tras reservar una clase
  const [mensaje, setMensaje] = useState("");

  // DÃ­a seleccionado en el calendario
  const [diaSeleccionado, setDiaSeleccionado] = useState("");

  // ID del usuario autenticado (guardado en localStorage al iniciar sesiÃ³n)
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const usuarioId = usuario?.id;

    /**
   * ======================================================
   * Cargar clases y reservas desde el backend
   * - Se usa useCallback para evitar recrear la funciÃ³n
   * - Se cargan clases reales y reservas reales del usuario
   * ======================================================
   */
  const fetchData = useCallback(async () => {
    try {
      // Cargar clases reales
      const clasesRes = await axios.get(`${API_URL}/clases`);
      setClases(clasesRes.data);

      // Cargar reservas del usuario
      const reservasRes = await axios.get(
        `${API_URL}/inscripciones/usuario/${usuarioId}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      );

      setReservasUsuario(reservasRes.data);

    } catch (err) {
      console.error("Error cargando datos:", err);
    }
  }, [usuarioId]);

  // Carga inicial
  useEffect(() => {
    if (usuarioId) fetchData();
  }, [usuarioId, fetchData]);

  // Recargar automÃ¡ticamente al volver a esta pestaÃ±a
  useEffect(() => {
    const handleFocus = () => {
      if (usuarioId) fetchData();
    };
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [fetchData]);

  /**
   * ======================================================
   * Reservar clase
   * - EnvÃ­a la inscripciÃ³n al backend
   * - Recarga las reservas reales del usuario
   * - Muestra mensaje temporal de Ã©xito o error
   * ======================================================
   */
  const reservarClase = async (claseId) => {
    try {
      await axios.post(
        `${API_URL}/inscripciones`,
        { usuarioId, claseId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      );

      // Recargar reservas reales
      const reservasRes = await axios.get(
        `${API_URL}/inscripciones/usuario/${usuarioId}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      );

      setReservasUsuario(reservasRes.data);

      setMensaje("Clase reservada con Ã©xito âœ”");
      setTimeout(() => setMensaje(""), 3000);

    } catch (error) {
      console.error("Error al reservar:", error);
      setMensaje("Error al reservar la clase â�Œ");
      setTimeout(() => setMensaje(""), 3000);
    }
  };

  /**
   * ======================================================
   * IDs de clases reservadas por el usuario
   * - Se usa un Set para comprobar reservas rÃ¡pidamente
   * ======================================================
   */
  const clasesReservadas = new Set(
    reservasUsuario
      .filter(r => r.estado === "INSCRITO")
      .map(r => r.claseId)
  );

  /**
   * ======================================================
   * Filtrar clases segÃºn el dÃ­a seleccionado en el calendario
   * ======================================================
   */
  const clasesFiltradas = diaSeleccionado
    ? clases.filter(c => {
        const fechaClase = new Date(c.fechaHora);
        const fechaISO = fechaClase.toISOString().split("T")[0];
        return fechaISO === diaSeleccionado;
      })
    : clases;

  /**
   * ======================================================
   * Agrupar clases por dÃ­a de la semana
   * - Se usa reduce para crear un objeto con claves por dÃ­a
   * ======================================================
   */
  const clasesPorDia = clasesFiltradas.reduce((acc, clase) => {
    const fecha = new Date(clase.fechaHora);

    const dia = fecha.toLocaleDateString("es-ES", {
      weekday: "long"
    });

    if (!acc[dia]) acc[dia] = [];
    acc[dia].push(clase);

    return acc;
  }, {});

  return (
    <section className="container mt-4 text-light">

      <h1 className="fw-bold mb-4">Clases disponibles</h1>

      {/* ============================
          Selector de dÃ­a (calendario)
         ============================ */}
      <div className="mb-4">
        <label className="form-label fw-bold">Selecciona un dÃ­a:</label>
        <input
          type="date"
          className="form-control"
          value={diaSeleccionado}
          onChange={(e) => setDiaSeleccionado(e.target.value)}
        />
      </div>

      {/* Mensaje de Ã©xito/error */}
      {mensaje && (
        <div className="alert alert-info text-center">{mensaje}</div>
      )}

      {/* ============================
          ACCORDION AGRUPADO POR DÃ�A
         ============================ */}
      <div className="accordion" id="accordionClases">

        {Object.entries(clasesPorDia).map(([dia, clasesDia], index) => (
          <div className="accordion-item bg-dark text-light" key={dia}>

            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed bg-secondary text-light"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse-${index}`}
              >
                {dia.charAt(0).toUpperCase() + dia.slice(1)}
              </button>
            </h2>

            <div
              id={`collapse-${index}`}
              className="accordion-collapse collapse"
              data-bs-parent="#accordionClases"
            >
              <div className="accordion-body">

                {clasesDia
                  .sort((a, b) => new Date(a.fechaHora) - new Date(b.fechaHora))
                  .map(clase => (
                    <div key={clase.id} className="dashboard-card p-3 mb-3">

                      <h4>{clase.actividadNombre}</h4>

                      {/* DÃ­a + Hora */}
                      <p className="m-0">
                        <FaClock />{" "}
                        {new Date(clase.fechaHora).toLocaleDateString("es-ES", {
                          weekday: "long",
                          day: "2-digit",
                          month: "2-digit"
                        })}{" "}
                        â€”{" "}
                        {new Date(clase.fechaHora).toLocaleTimeString("es-ES", {
                          hour: "2-digit",
                          minute: "2-digit"
                        })}{" "}
                        â€” <strong>{clase.actividadNombre}</strong> (Coach: {clase.coachNombre})
                      </p>

                      <p className="m-0 opacity-75">
                        Aforo: {clase.aforoMaximo}
                      </p>

                      {clasesReservadas.has(clase.id) ? (
                        <button className="btn btn-secondary mt-2 w-100" disabled>
                          Clase reservada
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary mt-2 w-100"
                          onClick={() => reservarClase(clase.id)}
                        >
                          Reservar clase
                        </button>
                      )}

                    </div>
                  ))}

              </div>
            </div>

          </div>
        ))}

      </div>

    </section>
  );
}