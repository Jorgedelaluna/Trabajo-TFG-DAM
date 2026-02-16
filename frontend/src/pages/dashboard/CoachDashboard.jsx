
export default function CoachDashboard() {
  return (
    <div className="container mt-4">

      <h1 className="fw-bold mb-4">Panel del Coach</h1>
      <p className="text-muted">Gestiona tus clases, atletas y asistencia.</p>

      <div className="row mt-4">

        <div className="col-md-6 mb-3">
          <div className="card shadow h-100">
            <div className="card-body">
              <h4 className="fw-bold">Mis clases</h4>
              <p>Revisa y gestiona tus clases programadas.</p>
              <a href="/clases" className="btn btn-primary">Ver clases</a>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card shadow h-100">
            <div className="card-body">
              <h4 className="fw-bold">Atletas inscritos</h4>
              <p>Consulta quién asistirá a tus clases.</p>
              <a href="/reservas" className="btn btn-primary">Ver reservas</a>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
