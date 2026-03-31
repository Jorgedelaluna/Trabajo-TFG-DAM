/**
 * ======================================================
 *  PÁGINA PRIVADA: ClasesUsuarioPage.jsx
 * 
 *  Muestra todas las clases disponibles para el usuario.
 *  Funcionalidades principales:
 *    - Filtrar clases por fecha mediante un input type="date"
 *    - Agrupar clases por día de la semana en un accordion
 *    - Permitir reservar una clase (se guarda en el backend)
 *    - Actualizar automáticamente MisReservas al reservar
 * 
 *  Esta página es clave para la experiencia del usuario,
 *  ya que centraliza la búsqueda y reserva de clases.
 * ======================================================
 */

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "../../styles/ClasesUsuario.css";
import { FaClock } from "react-icons/fa";


export default function ClasesUsuarioPage() {

  // Estado donde guardamos todas las clases obtenidas del backend
  const [clases, setClases] = useState([]);

  // Reservas del usuario autenticado
  const [reservasUsuario, setReservasUsuario] = useState([]);

  // Mensaje informativo de éxito/error tras reservar una clase
  const [mensaje, setMensaje] = useState("");

  // Día seleccionado en el calendario
  const [diaSeleccionado, setDiaSeleccionado] = useState("");

  // ID del usuario autenticado (guardado en localStorage al iniciar sesión)
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const usuarioId = usuario?.id;

    /**
   * ======================================================
   * Cargar clases y reservas desde el backend
   * - Se usa useCallback para evitar recrear la función
   * - Se cargan clases reales y reservas reales del usuario
   * ======================================================
   */
  const fetchData = useCallback(async () => {
    try {
      // Cargar clases reales
      const clasesRes = await axios.get("http://localhost:8080/clases");
      setClases(clasesRes.data);

      // Cargar reservas del usuario
      const reservasRes = await axios.get(
        `http://localhost:8080/inscripciones/usuario/${usuarioId}`,
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

  // Recargar automáticamente al volver a esta pestaña
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
   * - Envía la inscripción al backend
   * - Recarga las reservas reales del usuario
   * - Muestra mensaje temporal de éxito o error
   * ======================================================
   */
  const reservarClase = async (claseId) => {
    try {
      await axios.post(
        "http://localhost:8080/inscripciones",
        { usuarioId, claseId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      );

      // Recargar reservas reales
      const reservasRes = await axios.get(
        `http://localhost:8080/inscripciones/usuario/${usuarioId}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      );

      setReservasUsuario(reservasRes.data);

      setMensaje("Clase reservada con éxito ✔");
      setTimeout(() => setMensaje(""), 3000);

    } catch (error) {
      console.error("Error al reservar:", error);
      setMensaje("Error al reservar la clase ❌");
      setTimeout(() => setMensaje(""), 3000);
    }
  };

  /**
   * ======================================================
   * IDs de clases reservadas por el usuario
   * - Se usa un Set para comprobar reservas rápidamente
   * ======================================================
   */
  const clasesReservadas = new Set(
    reservasUsuario
      .filter(r => r.estado === "INSCRITO")
      .map(r => r.claseId)
  );

  /**
   * ======================================================
   * Filtrar clases según el día seleccionado en el calendario
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
   * Agrupar clases por día de la semana
   * - Se usa reduce para crear un objeto con claves por día
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
          Selector de día (calendario)
         ============================ */}
      <div className="mb-4">
        <label className="form-label fw-bold">Selecciona un día:</label>
        <input
          type="date"
          className="form-control"
          value={diaSeleccionado}
          onChange={(e) => setDiaSeleccionado(e.target.value)}
        />
      </div>

      {/* Mensaje de éxito/error */}
      {mensaje && (
        <div className="alert alert-info text-center">{mensaje}</div>
      )}

      {/* ============================
          ACCORDION AGRUPADO POR DÍA
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

                      {/* Día + Hora */}
                      <p className="m-0">
                        <FaClock />{" "}
                        {new Date(clase.fechaHora).toLocaleDateString("es-ES", {
                          weekday: "long",
                          day: "2-digit",
                          month: "2-digit"
                        })}{" "}
                        —{" "}
                        {new Date(clase.fechaHora).toLocaleTimeString("es-ES", {
                          hour: "2-digit",
                          minute: "2-digit"
                        })}{" "}
                        — <strong>{clase.actividadNombre}</strong> (Coach: {clase.coachNombre})
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
