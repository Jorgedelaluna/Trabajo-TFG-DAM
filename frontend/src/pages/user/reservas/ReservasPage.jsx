/**
 * ============================================================
 *  PÁGINA PRIVADA: ReservasPage.jsx
 * 
 *  Esta página permite al usuario reservar clases de forma
 *  rápida mediante un calendario semanal.
 * 
 *  Estructura:
 *    - CalendarioSemanal: selecciona el día
 *    - ListaClasesDia: muestra las clases del día elegido
 * 
 *  Es una vista alternativa a ClasesUsuarioPage, más visual
 *  y centrada en la experiencia de reserva rápida.
 * ============================================================
 */

import { useState } from "react";
import CalendarioSemanal from "./CalendarioSemanal";
import ListaClasesDia from "./ListaClasesDia";
import "../../../styles/Reservas.css";

export default function ReservasPage() {

  // Día seleccionado en el calendario semanal
  const [diaSeleccionado, setDiaSeleccionado] = useState("Lunes");

  return (
    <section className="reservas-section">
      <div className="container">

        {/* =========================================
            TÍTULO PRINCIPAL
        ========================================= */}
        <div className="text-center mb-5">
          <h1 className="fw-bold text-light">Reserva tu Clase</h1>
          <p className="text-light opacity-75">
            Selecciona un día y reserva tu entrenamiento.
          </p>
        </div>

        {/* ========================================
            CALENDARIO + LISTA DE CLASES
        ======================================== */}
        <div className="row g-4">

          {/* Calendario semanal*/}
          <div className="col-md-4">
            <CalendarioSemanal 
              diaSeleccionado={diaSeleccionado}
              setDiaSeleccionado={setDiaSeleccionado}
            />
          </div>

          {/* Lista de clases del día seleccionado*/}
          <div className="col-md-8">
            <ListaClasesDia dia={diaSeleccionado} />
          </div>

        </div>

      </div>
    </section>
  );
}
