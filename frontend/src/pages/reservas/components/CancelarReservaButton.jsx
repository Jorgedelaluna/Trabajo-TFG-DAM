/** ======================================================
 * BOTÓN CANCELAR RESERVA
 * - Envía petición al backend para cancelar la reserva
 * - Actualiza el estado local de MisReservasPage
 * - Incluye confirmación para evitar cancelaciones accidentales
 * ====================================================== */

import axios from "axios";

export default function CancelarReservaButton({ reservaId, setReservas }) {

  /** ======================================================
   * FUNCIÓN: cancelar()
   * - Confirma la acción con el usuario
   * - Llama al backend para cancelar la reserva
   * - Actualiza el estado local sin recargar la página
   * ====================================================== */
  
  const cancelar = async () => {
    const confirmar = window.confirm(
      "¿Seguro que quieres cancelar esta reserva?"
    );
    if (!confirmar) return;

    try {
      // Petición al backend
      await axios.put(
        `http://localhost:8080/inscripciones/${reservaId}/cancelar`
      );

      // Actualizar estado local (optimista)
      setReservas((prev) =>
        prev.map((r) =>
          r.id === reservaId ? { ...r, estado: "CANCELADO" } : r
        )
      );

      alert("Reserva cancelada correctamente");
    } catch (error) {
      console.error("Error al cancelar la reserva:", error);
      alert("No se pudo cancelar la reserva. Inténtalo más tarde.");
    }
  };

  return (
    <button className="btn btn-danger fw-bold mt-3" onClick={cancelar}>
      Cancelar reserva
    </button>
  );
}

