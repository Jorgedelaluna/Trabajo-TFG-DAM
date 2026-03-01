import axios from "axios";
import { useAuth } from "../../../authTemp/AuthContext";

export default function BotonReserva({ plazas, hora, actividad, dia }) {
  const disponible = plazas > 0;
  const { usuario } = useAuth();

  const handleReserva = async () => {
    try {
      const response = await axios.post("http://localhost:3000/reservas", {
        usuarioId: usuario.id,
        dia,
        hora,
        actividad,
      });

      alert("Reserva realizada con éxito");
    } catch (error) {
      console.error(error);
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
