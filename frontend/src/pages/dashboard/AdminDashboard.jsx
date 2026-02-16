
export default function AdminDashboard() {
  return (
    <div className="container mt-4">

      <h1 className="fw-bold mb-4">Panel de Administración</h1>
      <p className="text-muted">Gestiona usuarios, clases, reservas y estadísticas del box.</p>

      <div className="row mt-4">

        <div className="col-md-4 mb-3">
          <div className="card shadow h-100">
            <div className="card-body">
              <h4 className="fw-bold">Usuarios</h4>
              <p>Gestiona atletas, coaches y administradores.</p>
              <a href="/usuarios" className="btn btn-primary">Ver usuarios</a>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow h-100">
            <div className="card-body">
              <h4 className="fw-bold">Clases</h4>
              <p>Crea, edita y organiza clases del box.</p>
              <a href="/clases" className="btn btn-primary">Ver clases</a>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow h-100">
            <div className="card-body">
              <h4 className="fw-bold">Reservas</h4>
              <p>Controla las reservas de los atletas.</p>
              <a href="/reservas" className="btn btn-primary">Ver reservas</a>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
