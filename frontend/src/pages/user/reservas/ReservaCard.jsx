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
    const actividadNombre = reserva.claseNombre || "Actividad no definida";
    const coachNombre = reserva.coachNombre || "Sin coach asignado";
    const fechaHora = reserva.fechaHora;

    const estado =
        typeof reserva.estado === "string"
            ? reserva.estado
            : reserva.estado?.name;

    const fechaValida = fechaHora ? new Date(fechaHora) : null;

    const hora = fechaValida
        ? fechaValida.toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
        })
        : "No disponible";

    const fechaCorta = fechaValida
        ? fechaValida.toLocaleDateString("es-ES", {
            weekday: "short",
            day: "2-digit",
            month: "2-digit",
        })
        : "No disponible";

    return (
        <div className="dashboard-card reserva-card clase-item-card clase-agenda-card h-100">
            <div className="clase-agenda-time">
                <div className="clase-agenda-hour">{hora}</div>
                <div className="clase-agenda-date">{fechaCorta}</div>
            </div>

            <div className="clase-agenda-content">
                <h4 className="mb-2">{actividadNombre}</h4>

                <p className="mb-1">
                    <strong>Coach:</strong> {coachNombre}
                </p>

                <p className="mb-0 opacity-75">
                    <strong>Estado:</strong> {estado}
                </p>
            </div>

            <div className="clase-agenda-action">
                {estado === "INSCRITO" ? (
                    <>
                        <span className="badge bg-success mb-2">Reservada</span>
                        <CancelarReservaButton
                            reservaId={reserva.id}
                            setReservas={setReservas}
                        />
                    </>
                ) : (
                    <>
                        <span className="badge bg-secondary mb-2">{estado}</span>
                        <button className="btn btn-secondary btn-reservar" disabled>
                            No disponible
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}