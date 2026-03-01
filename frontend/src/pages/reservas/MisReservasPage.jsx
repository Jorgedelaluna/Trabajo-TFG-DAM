/**
 * ======================================================
 *  MIS RESERVAS
 *  - Página donde el usuario ve y gestiona sus reservas
 *  - Obtiene las reservas desde el backend según su ID
 *  - Permite cancelar reservas desde cada tarjeta
 * ======================================================
 */

import { useEffect, useState } from "react";
import axios from "axios";
import ReservaCard from "./components/ReservaCard";
import "../../styles/Reservas.css";
import { useAuth } from "../../authTemp/AuthContext";

export default function MisReservasPage() {
  const { usuario } = useAuth();

  // Estado local
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);


  /** ======================================================
   * CARGAR RESERVAS DEL USUARIO
   * - Se ejecuta al montar el componente
   * - Solo se ejecuta si usuario está disponible
   * ====================================================== */
  
  useEffect(() => {
    if (!usuario?.id) return; // Evita errores si usuario tarda en cargar

    const cargarReservas = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/inscripciones/usuario/${usuario.id}`
        );
        setReservas(response.data);
      } catch (error) {
        console.error("Error cargando reservas:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarReservas();
  }, [usuario.id]);

/** ======================================================
 * ESTADO DE CARGA
 * ====================================================== */

  if (cargando) {
    return (
      <div className="text-center text-light mt-5">
        <h3>Cargando tus reservas...</h3>
      </div>
    );
  }

  /** * ======================================================
   * RENDER PRINCIPAL
   * ====================================================== */

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
                <ReservaCard reserva={reserva} setReservas={setReservas} />
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
