import React from "react";
import { Link } from "react-router-dom";

export default function DashboardCoachPage() {
  return (
    <div className="container mt-4">
      <h2>Dashboard Coach</h2>
      <div className="row g-3 mt-2">
        <div className="col-md-4"><div className="card p-3"><h5>Clases</h5><Link to="/clases-admin" className="btn btn-outline-primary">Gestionar</Link></div></div>
        <div className="col-md-4"><div className="card p-3"><h5>WODs</h5><Link to="/wods" className="btn btn-outline-primary">Ver</Link></div></div>
        <div className="col-md-4"><div className="card p-3"><h5>Perfil</h5><Link to="/perfil" className="btn btn-outline-primary">Ver</Link></div></div>
      </div>
    </div>
  );
}
