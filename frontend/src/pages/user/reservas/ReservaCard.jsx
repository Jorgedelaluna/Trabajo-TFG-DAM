/**
 * ======================================================
 *  RESERVA CARD
 *  - Muestra la información de una reserva concreta
 *  - Incluye botón para cancelar si está en estado INSCRITO
 *  - Se usa dentro de MisReservasPage.jsx
 * ======================================================
 */

import CancelarReservaButton from "./CancelarReservaButton";

export default function ReservaCard({ reserva, setReservas }) {

  // El backend devuelve un DTO plano, no un objeto clase completo.
  // Por eso accedemos a los campos directamente desde reserva.
  // Datos reales desde el backend
  const clase = reserva.clase || {};

  const actividadNombre =
    clase.actividad?.nombre || "Actividad no definida";

  const coachNombre =
    clase.coach?.nombre || "Sin coach asignado";

  const fechaHora = clase.fechaHora;

  const estado =
    typeof reserva.estado === "string"
      ? reserva.estado
      : reserva.estado?.name;

  return (
    <div className="card reserva-card shadow">
      <div className="card-body">

        {/* Nombre de la actividad */}
        <h4 className="text-light fw-bold">{actividadNombre}</h4>

        {/* Fecha */}
        <p className="text-light m-0">
          <strong>Día:</strong>{" "}
          {new Date(fechaHora).toLocaleDateString("es-ES", {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
          })}
        </p>

        {/* Hora */}
        <p className="text-light m-0">
          <strong>Hora:</strong>{" "}
          {new Date(fechaHora).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          })}
        </p>

        {/* Coach */}
        <p className="text-light m-0">
          <strong>Coach:</strong> {coachNombre}
        </p>

        {/* Estado */}
        <p className="text-light opacity-75 mt-2">
          Estado: <strong>{estado}</strong>
        </p>

        {/* Botón cancelar reserva (solo si está inscrito) */}
        {estado === "INSCRITO" && (
          <CancelarReservaButton
            reservaId={reserva.id}
            setReservas={setReservas}
          />
        )}

      </div>
    </div>
  );
}
