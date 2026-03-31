/**
 * ============================================================
 *  COMPONENTE: CalendarioSemanal.jsx
 * 
 *  Calendario simple para seleccionar un día de la semana.
 *  Se usa dentro de ReservasPage para filtrar las clases
 *  según el día elegido por el usuario.
 * 
 *  El estado del día seleccionado se gestiona desde el padre
 *  (ReservasPage) y se recibe por props.
 * ============================================================
 */

export default function CalendarioSemanal({ diaSeleccionado, setDiaSeleccionado }) {

  // Días disponibles en el calendario semanal
  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

  return (
    <div className="card calendario-card shadow">
      <div className="card-body">

        {/* Título del calendario */}
        <h5 className="text-light fw-bold mb-3">Selecciona un día</h5>

        {/* Lista del calendario */}
        <ul className="list-group calendario-list">
          {dias.map((dia) => (
            <li
              key={dia}
              className={`list-group-item calendario-item ${
                dia === diaSeleccionado ? "active" : ""
              }`}
              onClick={() => setDiaSeleccionado(dia)}
            >
              {dia}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
