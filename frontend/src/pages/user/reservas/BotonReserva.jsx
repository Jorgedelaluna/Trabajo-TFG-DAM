/**
 * ============================================================
 *  COMPONENTE: BotonReserva.jsx
 * 
 *  Botón que permite al usuario reservar una clase.
 *  Funcionalidades:
 *    - Comprueba si hay plazas disponibles
 *    - Envía la reserva al backend
 *    - Usa el AuthContext para obtener usuario y token
 * 
 *  Este componente se usa dentro de ListaClasesDia.jsx.
 * ============================================================
 */

import { apiPost } from "../../../api/api";
import { useAuth } from "../../../auth/AuthContext";

export default function BotonReserva({ claseId, plazas }) {

  // Si hay plazas disponibles
  const disponible = plazas > 0;

  // Usuario autenticado y token desde el AuthContext
  const { usuario } = useAuth();


  /**
   * ============================================================
   *  Realizar reserva
   *  - Envía la inscripción al backend
   *  - Muestra un mensaje simple (alert) como feedback
   * ============================================================
   */
  const handleReserva = async () => {
    try {
      await apiPost("/inscripciones", {
        usuarioId: usuario.id,
        claseId: claseId
      });

      alert("Reserva realizada con éxito");
    } catch (error) {
      console.error("Error al reservar:", error);
      alert("Error al realizar la reserva");
    }
  };

  return (
    <button
      className={`btn ${disponible ? "btn-primary" : "btn-secondary"} fw-bold reserva-btn`}
      disabled={!disponible}
      onClick={handleReserva}
    >
      {disponible ? "Reservar" : "Completo"}
    </button>
  );
}
