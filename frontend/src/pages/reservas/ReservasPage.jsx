import { useState } from "react";
import CalendarioSemanal from "./components/CalendarioSemanal";
import ListaClasesDia from "./components/ListaClasesDia";
import "../../styles/Reservas.css";

export default function ReservasPage() {
  const [diaSeleccionado, setDiaSeleccionado] = useState("Lunes");

  return (
    <section className="reservas-section">
      <div className="container">

        {/* TÍTULO */}
        <div className="text-center mb-5">
          <h1 className="fw-bold text-light">Reserva tu Clase</h1>
          <p className="text-light opacity-75">
            Selecciona un día y reserva tu entrenamiento.
          </p>
        </div>

        {/* CALENDARIO + LISTA */}
        <div className="row g-4">

          {/* Calendario */}
          <div className="col-md-4">
            <CalendarioSemanal 
              diaSeleccionado={diaSeleccionado}
              setDiaSeleccionado={setDiaSeleccionado}
            />
          </div>

          {/* Lista de clases */}
          <div className="col-md-8">
            <ListaClasesDia dia={diaSeleccionado} />
          </div>

        </div>

      </div>
    </section>
  );
}
