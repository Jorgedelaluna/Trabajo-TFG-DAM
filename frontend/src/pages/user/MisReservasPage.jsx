/**
 * ======================================================
 *  MIS RESERVAS
 *  ------------------------------------------------------
 *  Esta página muestra todas las reservas realizadas por
 *  el usuario autenticado.
 *
 *  - Obtiene las reservas desde el backend:
 *      GET /inscripciones/usuario/{usuarioId}
 *
 *  - Cada reserva se muestra mediante el componente
 *    <ReservaCard />, que incluye la información de la clase
 *    y permite cancelar la reserva.
 *
 *  - Se utiliza el AuthContext para obtener el usuario actual.
 * ======================================================
 */

import { useEffect, useState } from "react";
import { apiGet } from "../../api/api";
import "../../styles/Reservas.css";
import ReservaCard from "./reservas/ReservaCard"; 
import { useAuth } from "../../auth/AuthContext";

export default function MisReservasPage() {

  // Usuario autenticado (desde el contexto global)
  const { usuario } = useAuth();

  // Estado local para almacenar las reservas del usuario
  const [reservas, setReservas] = useState([]);

  // Estado de carga para mostrar un mensaje mientras se obtienen los datos
  const [cargando, setCargando] = useState(true);

  /**
   * ======================================================
   * CARGAR RESERVAS DEL USUARIO
   * ------------------------------------------------------
   * Se ejecuta cuando el componente se monta y cuando
   * cambia el usuario (por ejemplo, al iniciar sesión).
   *
   * Si el usuario aún no está disponible, se evita la llamada.
   * ======================================================
   */
  useEffect(() => {
    if (!usuario?.id) return;

    const cargarReservas = async () => {
      try {
        const data = await apiGet(`/inscripciones/usuario/${usuario.id}`);

        // Filtramos solo las activas
        const activas = data.filter(r => {
          const estado = typeof r.estado === "string" ? r.estado : r.estado?.name;
          return estado === "INSCRITO";
        });

        setReservas(activas);
      } catch (err) {
        console.error("Error cargando reservas:", err);
      } finally {
        setCargando(false);
      }
    };

    cargarReservas();
  }, [usuario]);

  /**
   * ======================================================
   * ESTADO DE CARGA
   * ======================================================
   */
  if (cargando) {
    return (
      <div className="text-center text-light mt-5">
        <h3>Cargando tus reservas...</h3>
      </div>
    );
  }

  /**
   * ======================================================
   * RENDER PRINCIPAL
   * ======================================================
   */
  return (
    <section className="reservas-section">
      <div className="container">

        {/* Encabezado */}
        <div className="text-center mb-5">
          <h1 className="fw-bold text-light">Mis Reservas</h1>
          <p className="text-light opacity-75">
            Aquí puedes ver y gestionar tus clases reservadas.
          </p>
        </div>

        {/* Si no hay reservas */}
        {reservas.length === 0 ? (
          <p className="text-light text-center opacity-75">
            No tienes reservas activas.
          </p>
        ) : (
          <div className="row g-4">
            {reservas.map((reserva) => (
              <div className="col-md-6" key={reserva.id}>
                {/* Tarjeta individual de reserva */}
                <ReservaCard reserva={reserva} setReservas={setReservas} />
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

