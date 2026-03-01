export default function CalendarioSemanal({ diaSeleccionado, setDiaSeleccionado }) {
  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

  return (
    <div className="card calendario-card shadow">
      <div className="card-body">
        <h5 className="text-light fw-bold mb-3">Selecciona un día</h5>

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
