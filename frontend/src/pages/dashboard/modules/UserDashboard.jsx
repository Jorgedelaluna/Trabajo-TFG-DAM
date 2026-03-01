/**
 * ======================================================
 *  USER DASHBOARD
 *  - Página principal tras iniciar sesión
 *  - Muestra información básica del usuario
 *  - Incluye un gráfico simple de asistencia (simulado)
 *  - Pensado para ser claro y fácil de mantener
 * ======================================================
 */

import { useAuth } from "../../../authTemp/AuthContext";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";

export default function UserDashboardContent() {
  const { usuario } = useAuth();
  const chartRef = useRef(null);
  const navigate= useNavigate();

/**
 * ======================================================
 *  GRÁFICO DE ASISTENCIA (datos simulados)
 *  - Se destruye si ya existe para evitar duplicados
 *  - No usa datos reales (se explica en la memoria)
 * ======================================================
 */

  useEffect(() => {
    if (!chartRef.current)return;

    // Si ya existe un gráfico previo -> destruirlo
    const existingChart = Chart.getChart(chartRef.current);
    if (existingChart) {
      existingChart.destroy();
    }

    // Crear gráfico nuevo
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
        plugins: { legend: { labels: { color: "#fff" } } },
        scales: {
          x: { ticks: { color: "#fff" } },
          y: { ticks: { color: "#fff",
            stepSize: 1, // pasos de 1 en 1
            callback: function(value) {
              return Number.isInteger(value) ? value : null; // solo números enteros
            }},
            beginAtZero: true, // empieza en 0 horas
            suggestedMax: 5 // máximo de horas
           }}
      }}
    );

    // Cleanup al desmontar
    return () => {
      newChart.destroy();
    };
  }, []);

  return (
    <div className="dashboard-container">

      {/* ======================================================
          TARJETA DE PERFIL
      ====================================================== */}
      <div className="row justify-content-center">
        <div className="col-12">   
        <div className="profile-card dashboard-card mb-4 fade-in-up">
          <div className="d-flex align-items-center gap-3">
            <img
              src="/default_profile.png"
              alt="Foto de perfil"
              className="profile-avatar"
            />
            <div>
              <h4 className="m-0 nombre-usuario">{usuario?.nombre}</h4>
              <p className="m-0 profile-status">
                Estado de cuota: <span className="status-active estado-cuota">Activa</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

      {/* ======================================================
          GRID PRINCIPAL
      ====================================================== */}
      <div className="row g-4 justify-content-center">

        {/* Datos del usuario */}
        <div className="col-12">
        <div className="dashboard-card fade-in-up mb-4">
          <div className="dashboard-card-header">
            <span className="dashboard-icon">👤</span>
            <h5 className="m-0 ">Mis Datos</h5>
          </div>

          <div className="row">
            <div className="col-12 col-md-6">
              <p><strong>Nombre:</strong> {usuario?.nombre}</p>
              <p><strong>Email:</strong> {usuario?.email}</p>
            </div>

            <div className="col-12 col-md-6">
              <p><strong>Teléfono:</strong> {usuario?.telefono || "No registrado"}</p>
              <p><strong>Rol:</strong> {usuario?.rol}</p>
            </div>
          </div>

          {/* 🔥 Botón que redirige a Mi Perfil */}
          <button className="btn btn-primary mt-3" onClick={() => navigate("/perfil")}
          >
            Editar perfil
          </button>
        </div>
      </div>

        {/* Gráfico */}
        <div className="col-12">
          <div className="dashboard-card fade-in-up mb-4">
            <div className="dashboard-card-header">
              <span className="dashboard-icon">📊</span>
              <h5 className="m-0">Asistencia semanal</h5>
            </div>

            <canvas ref={chartRef} height="100"></canvas>
          </div>
        </div>

      </div>
      </div>
)}
