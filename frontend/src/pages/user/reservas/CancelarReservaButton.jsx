import { apiPut, apiGet } from "../../../api/api";
import { useAuth } from "../../../auth/AuthContext";

export default function CancelarReservaButton({ reservaId, setReservas }) {
    const { usuario } = useAuth();

    const cancelarReserva = async () => {
        try {
            await apiPut(`/inscripciones/${reservaId}/cancelar`);

            const data = await apiGet(`/inscripciones/usuario/${usuario.id}`);

            setReservas(
                data.filter((r) => {
                    const estado =
                        typeof r.estado === "string" ? r.estado : r.estado?.name;
                    return estado === "INSCRITO";
                })
            );

            alert("Reserva cancelada correctamente ✔");
        } catch (error) {
            console.error("Error al cancelar la reserva:", error);
            alert("No se pudo cancelar la reserva ✖");
        }
    };

    return (
        <button
            className="btn btn-outline-danger btn-sm fw-bold cancelar-btn"
            onClick={cancelarReserva}
        >
            Cancelar reserva
        </button>
    );
}