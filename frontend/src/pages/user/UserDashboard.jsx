import { useAuth } from "../../auth/AuthContext";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";
import "../../styles/Dashboard.css";

export default function UserDashboard() {
  const { usuario, loading } = useAuth();
  const chartRef = useRef(null);
  const navigate = useNavigate();

  const getCuotaBadge = (estado) => {
    switch (estado) {
      case "ACTIVA":
        return <span className="badge bg-success">ACTIVA</span>;
      case "INACTIVA":
        return <span className="badge bg-danger">INACTIVA</span>;
      case "PENDIENTE":
        return <span className="badge bg-warning text-dark">PENDIENTE</span>;
      default:
        return <span className="badge bg-secondary">DESCONOCIDO</span>;
    }
  };

  useEffect(() => {
    if (loading || !usuario || usuario.rol !== "USER" || !chartRef.current) return;

    const existingChart = Chart.getChart(chartRef.current);
    if (existingChart) {
      existingChart.destroy();
    }

    const newChart = new Chart(chartRef.current, {
      type: "line",
      data: {
        labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
        datasets: [
          {
            label: "Asistencia semanal",
            data: [2, 1, 2, 2, 1, 1],
            borderColor: "#F2C200",
            backgroundColor: "rgba(242, 194, 0, 0.2)",
            tension: 0.3,
            borderWidth: 2,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            labels: { color: "#fff" },
          },
        },
        scales: {
          x: {
            ticks: { color: "#fff" },
          },
          y: {
            ticks: {
              color: "#fff",
              stepSize: 1,
              callback: function (value) {
                return Number.isInteger(value) ? value : null;
              },
            },
            beginAtZero: true,
            suggestedMax: 5,
          },
        },
      },
    });

    return () => {
      newChart.destroy();
    };
  }, [loading, usuario]);

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-card p-4 text-center">
          <h3>Cargando...</h3>
        </div>
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-card p-4 text-center">
          <h3>No autorizado</h3>
        </div>
      </div>
    );
  }

  if (usuario.rol !== "USER") {
    return (
      <div className="dashboard-container">
        <div className="dashboard-card p-4 text-center">
          <h3>No tienes permisos</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="page-header-admin page-header-left">
        <h1 className="fw-bold">Mi Panel</h1>
      </div>

      <div className="profile-card dashboard-card mb-4 fade-in-up">
        <div className="d-flex align-items-center gap-3">
          <img
            src="/default_profile.png"
            alt="Foto de perfil"
            className="profile-avatar"
          />
          <div>
            <h4 className="m-0 nombre-usuario">{usuario.nombre}</h4>
            <p className="m-0 profile-status">
              Estado de cuota:{" "}
              {usuario.estadoCuota
                ? getCuotaBadge(usuario.estadoCuota)
                : "No disponible"}
            </p>
          </div>
        </div>
      </div>

      <div className="dashboard-card mb-4 fade-in-up">
        <div className="page-header-admin with-actions mb-3">
          <h5 className="m-0">Mis Datos</h5>

          <button
            className="btn btn-primary"
            onClick={() => navigate("/perfil")}
          >
            Editar perfil
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle dashboard-table mb-0">
            <tbody>
              <tr>
                <th style={{ width: "260px" }}>Nombre</th>
                <td>{usuario.nombre}</td>
              </tr>

              <tr>
                <th>Email</th>
                <td>{usuario.email}</td>
              </tr>

              <tr>
                <th>Teléfono</th>
                <td>{usuario.telefono || "No informado"}</td>
              </tr>

              <tr>
                <th>Sexo</th>
                <td>{usuario.sexo || "No informado"}</td>
              </tr>

              <tr>
                <th>Cuota</th>
                <td>
                  {usuario.estadoCuota
                    ? getCuotaBadge(usuario.estadoCuota)
                    : "No disponible"}
                </td>
              </tr>

              <tr>
                <th>Rol</th>
                <td>{usuario.rol || "No informado"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="dashboard-card fade-in-up mb-4">
        <div className="dashboard-card-header">
          <span className="dashboard-icon">📊</span>
          <h5 className="m-0">Asistencia semanal</h5>
        </div>

        <canvas ref={chartRef} height="100"></canvas>
      </div>
    </div>
  );
}
