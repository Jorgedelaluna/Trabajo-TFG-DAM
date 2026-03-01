import BotonReserva from "./BotonReserva";

const horario = {
  Lunes: [
    { hora: "09:00", actividad: "CrossFit", plazas: 10 },
    { hora: "10:00", actividad: "Halterofilia", plazas: 8 },
    { hora: "11:00", actividad: "Endurance", plazas: 12 },
  ],
  Martes: [
    { hora: "09:00", actividad: "Gymnastics", plazas: 10 },
    { hora: "10:00", actividad: "CrossFit", plazas: 6 },
  ],
  Miércoles: [
    { hora: "09:00", actividad: "Endurance", plazas: 10 },
    { hora: "10:00", actividad: "CrossFit", plazas: 8 },
  ],
  Jueves: [
    { hora: "09:00", actividad: "CrossFit", plazas: 10 },
    { hora: "10:00", actividad: "Endurance", plazas: 8 },
  ],
  Viernes: [
    { hora: "09:00", actividad: "Halterofilia", plazas: 10 },
    { hora: "10:00", actividad: "CrossFit", plazas: 8 },
  ],
  Sábado: [
    { hora: "10:00", actividad: "CrossFit (Especial)", plazas: 15 },
    { hora: "11:00", actividad: "Gymnastics (Especial)", plazas: 15 },
  ],
};

export default function ListaClasesDia({ dia }) {
  const clases = horario[dia] || [];

  return (
    <div className="card clases-card shadow">
      <div className="card-body">
        <h4 className="text-light fw-bold mb-4">{dia}</h4>

        {clases.length === 0 && (
          <p className="text-light opacity-75">No hay clases disponibles.</p>
        )}

        <div className="list-group">
          {clases.map((clase, index) => (
            <div key={index} className="list-group-item clase-item">
              <div>
                <h5 className="text-light m-0">{clase.hora}</h5>
                <p className="text-light opacity-75 m-0">{clase.actividad}</p>
              </div>

              <BotonReserva
                plazas={clase.plazas}
                hora={clase.hora}
                actividad={clase.actividad}
                dia={dia}
                />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
