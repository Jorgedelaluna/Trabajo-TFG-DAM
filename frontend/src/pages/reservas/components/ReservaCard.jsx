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
  // Seguridad: si por algún motivo la clase no viene cargada
  const clase = reserva.clase;

  return (
    <div className="card reserva-card shadow">
      <div className="card-body">

        {/* Título de la actividad */}
        <h4 className="text-light fw-bold">{clase.actividad}</h4>

        {/* Fecha */}
        <p className="text-light m-0">
          <strong>Día:</strong> {new Date(clase.fechaHora).toLocaleDateString()}
        </p>

        {/* Hora */}
        <p className="text-light m-0">
          <strong>Hora:</strong> {new Date(clase.fechaHora).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>

        {/* Estado */}
        <p className="text-light opacity-75 mt-2">
          Estado: <strong>{reserva.estado}</strong>
        </p>

        {/* Botón cancelar reserva (solo si está inscrito) */}
        {reserva.estado === "INSCRITO" && (
          <CancelarReservaButton reservaId={reserva.id} setReservas={setReservas} />
        )}

      </div>
    </div>
  );
}
