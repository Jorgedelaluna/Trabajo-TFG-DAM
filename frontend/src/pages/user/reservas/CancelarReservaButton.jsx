/**
 * ======================================================
 *  BOTÓN CANCELAR RESERVA
 *  - Botón que permite cancelar una reserva concreta.
 *
 *  - Llama al endpoint:
 *      PUT /inscripciones/{id}/cancelar
 *
 *  - Tras cancelar, actualiza la lista de reservas en
 *    MisReservasPage.jsx mediante setReservas().
 *
 *  - Solo se muestra cuando la reserva está en estado INSCRITO.
 * ======================================================
 */

import { apiPut, apiGet } from "../../../api/api";
import { useAuth } from "../../../auth/AuthContext";

export default function CancelarReservaButton({ reservaId, setReservas }) {

    const { usuario} = useAuth();

  /**
   * ======================================================
   *  FUNCIÓN: cancelarReserva
   *  - Llama al backend para cancelar la inscripción.
   *  - Después vuelve a cargar la lista de reservas del usuario.
   * ======================================================
   */
  const cancelarReserva = async () => {
    try {
      await apiPut(`/inscripciones/${reservaId}/cancelar`);

      const data = await apiGet(`/inscripciones/usuario/${usuario.id}`);

      setReservas(
        data.filter(r => {
          const estado = typeof r.estado === "string" ? r.estado : r.estado?.name;
          return estado === "INSCRITO";
        })
      );

      alert("Reserva cancelada correctamente ✔");
    } catch (error) {
      console.error("Error al cancelar la reserva:", error);
      alert("No se pudo cancelar la reserva ❌");
    }
  };

  return (
    <button
      className="btn btn-danger mt-2 w-100 fw-bold"
      onClick={cancelarReserva}
    >
      Cancelar reserva
    </button>
  );
}
