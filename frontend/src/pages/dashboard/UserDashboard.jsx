
export default function UserDashboard() {
  return (
    <div className="container mt-4">

      <h1 className="fw-bold mb-4">Mi Panel</h1>
      <p className="text-muted">Gestiona tus reservas, clases y perfil.</p>

      <div className="row mt-4">

        <div className="col-md-4 mb-3">
          <div className="card shadow h-100">
            <div className="card-body">
              <h4 className="fw-bold">Mis reservas</h4>
              <p>Consulta tus clases reservadas.</p>
              <a href="/reservas" className="btn btn-primary">Ver reservas</a>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow h-100">
            <div className="card-body">
              <h4 className="fw-bold">Clases disponibles</h4>
              <p>Reserva nuevas clases del box.</p>
              <a href="/clases" className="btn btn-primary">Ver clases</a>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow h-100">
            <div className="card-body">
              <h4 className="fw-bold">Mi perfil</h4>
              <p>Edita tu información personal.</p>
              <a href="/perfil" className="btn btn-primary">Ver perfil</a>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
