/**
 * ======================================================
 *  PÁGINA PÚBLICA: Horarios del Box
 *  - Muestra los horarios generales y el horario semanal
 *  - Página estática orientada a información comercial
 *  - Incluye tarjetas y un calendario semanal detallado
 * ======================================================
 */

import "../../styles/Horarios.css";
import { FaClock } from "react-icons/fa";

export default function HorariosPage() {
  return (
    <section className="horarios-section">
      <div className="container">

        {/* ======================================================
            ENCABEZADO PRINCIPAL
        ====================================================== */}
        <div className="text-center mb-5">
          <h1 className="fw-bold text-light">Horarios del Box</h1>
          <p className="text-light opacity-75">
            Consulta nuestros horarios y encuentra el momento perfecto para entrenar.
          </p>
        </div>

        {/* ======================================================
            TARJETAS RESUMEN (Lunes-Viernes, Sábado, Domingo)
        ====================================================== */}
        <div className="row g-4">

          {/* Lunes a Viernes */}
          <div className="col-md-4">
            <div className="card horarios-card shadow h-100">
              <div className="card-body">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <FaClock className="horarios-icon text-primary" />
                  <span className="horarios-day">Lunes - Viernes</span>
                </div>

                <p className="horarios-time">9:00 - 22:00</p>

                <ul className="horarios-list">
                  <li>CrossFit</li>
                  <li>Halterofilia</li>
                  <li>Endurance</li>
                  <li>Gymnastics</li>
                  <li>Meditación & Mobility</li>
                  <li>Open Box</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sábado */}
          <div className="col-md-4">
            <div className="card horarios-card shadow h-100">
              <div className="card-body">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <FaClock className="horarios-icon text-warning" />
                  <span className="horarios-day">Sábado</span>
                </div>

                <p className="horarios-time">10:00 - 14:00</p>
                <p className="text-light">Sesiones especiales:</p>

                <ul className="horarios-list">
                  <li>CrossFit</li>
                  <li>Gymnastics</li>
                  <li>Open Box</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Domingo */}
          <div className="col-md-4">
            <div className="card horarios-card shadow h-100">
              <div className="card-body">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <FaClock className="horarios-icon text-danger" />
                  <span className="horarios-day">Domingo</span>
                </div>

                <p className="horarios-time">Cerrado</p>
                <p className="text-light">
                  Día de descanso para recuperar y volver más fuerte.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* ======================================================
            HORARIO SEMANAL COMPLETO
        ====================================================== */}
        <div className="mt-5">
          <h2 className="fw-bold text-light text-center mb-4">
            Horario Semanal Completo
          </h2>

          <div className="row g-4">

            {/* Lunes */}
            <div className="col-md-4">
              <div className="card horarios-card shadow h-100">
                <div className="card-body">
                  <h5 className="horarios-day text-warning">Lunes</h5>
                  <ul className="horarios-list mt-3">
                    <li>09:00 — CrossFit</li>
                    <li>10:00 — Halterofilia</li>
                    <li>11:00 — Endurance</li>
                    <li>12:00 — Meditación & Mobility</li>
                    <li>13:00 — Open Box</li>
                    <li>14:00 — Gymnastics</li>
                    <li>15:00 — CrossFit</li>
                    <li>16:00 — Endurance</li>
                    <li>17:00 — Halterofilia</li>
                    <li>18:00 — CrossFit</li>
                    <li>19:00 — Gymnastics</li>
                    <li>20:00 — Open Box</li>
                    <li>21:00 — CrossFit</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Martes */}
            <div className="col-md-4">
              <div className="card horarios-card shadow h-100">
                <div className="card-body">
                  <h5 className="horarios-day text-warning">Martes</h5>
                  <ul className="horarios-list mt-3">
                    <li>09:00 — Gymnastics</li>
                    <li>10:00 — CrossFit</li>
                    <li>11:00 — Meditación & Mobility</li>
                    <li>12:00 — Halterofilia</li>
                    <li>13:00 — Endurance</li>
                    <li>14:00 — Open Box</li>
                    <li>15:00 — CrossFit</li>
                    <li>16:00 — Gymnastics</li>
                    <li>17:00 — Endurance</li>
                    <li>18:00 — Halterofilia</li>
                    <li>19:00 — CrossFit</li>
                    <li>20:00 — Meditación & Mobility</li>
                    <li>21:00 — Open Box</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Miércoles */}
            <div className="col-md-4">
              <div className="card horarios-card shadow h-100">
                <div className="card-body">
                  <h5 className="horarios-day text-warning">Miércoles</h5>
                  <ul className="horarios-list mt-3">
                    <li>09:00 — Endurance</li>
                    <li>10:00 — CrossFit</li>
                    <li>11:00 — Halterofilia</li>
                    <li>12:00 — Gymnastics</li>
                    <li>13:00 — Open Box</li>
                    <li>14:00 — Meditación & Mobility</li>
                    <li>15:00 — CrossFit</li>
                    <li>16:00 — Endurance</li>
                    <li>17:00 — Gymnastics</li>
                    <li>18:00 — Halterofilia</li>
                    <li>19:00 — CrossFit</li>
                    <li>20:00 — Open Box</li>
                    <li>21:00 — Meditación & Mobility</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Jueves */}
            <div className="col-md-4">
              <div className="card horarios-card shadow h-100">
                <div className="card-body">
                  <h5 className="horarios-day text-warning">Jueves</h5>
                  <ul className="horarios-list mt-3">
                    <li>09:00 — CrossFit</li>
                    <li>10:00 — Endurance</li>
                    <li>11:00 — Gymnastics</li>
                    <li>12:00 — Halterofilia</li>
                    <li>13:00 — Meditación & Mobility</li>
                    <li>14:00 — Open Box</li>
                    <li>15:00 — CrossFit</li>
                    <li>16:00 — Halterofilia</li>
                    <li>17:00 — Endurance</li>
                    <li>18:00 — Gymnastics</li>
                    <li>19:00 — CrossFit</li>
                    <li>20:00 — Open Box</li>
                    <li>21:00 — Meditación & Mobility</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Viernes */}
            <div className="col-md-4">
              <div className="card horarios-card shadow h-100">
                <div className="card-body">
                  <h5 className="horarios-day text-warning">Viernes</h5>
                  <ul className="horarios-list mt-3">
                    <li>09:00 — Halterofilia</li>
                    <li>10:00 — CrossFit</li>
                    <li>11:00 — Endurance</li>
                    <li>12:00 — Gymnastics</li>
                    <li>13:00 — Open Box</li>
                    <li>14:00 — Meditación & Mobility</li>
                    <li>15:00 — CrossFit</li>
                    <li>16:00 — Endurance</li>
                    <li>17:00 — Halterofilia</li>
                    <li>18:00 — CrossFit</li>
                    <li>19:00 — Gymnastics</li>
                    <li>20:00 — Open Box</li>
                    <li>21:00 — Meditación & Mobility</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Sábado */}
            <div className="col-md-4">
              <div className="card horarios-card shadow h-100">
                <div className="card-body">
                  <h5 className="horarios-day text-warning">Sábado</h5>
                  <ul className="horarios-list mt-3">
                    <li>10:00 — CrossFit (Especial)</li>
                    <li>11:00 — Gymnastics (Especial)</li>
                    <li>12:00 — Open Box (Especial)</li>
                    <li>13:00 — CrossFit (Especial)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Domingo */}
            <div className="col-md-4">
              <div className="card horarios-card shadow h-100">
                <div className="card-body">
                  <h5 className="horarios-day text-danger">Domingo</h5>
                  <p className="text-light mt-3">Cerrado</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ======================================================
            CTA FINAL
        ====================================================== */}
        <div className="text-center mt-5">
          <a href="/registro" className="btn btn-primary btn-lg fw-bold px-5">
            Reserva tu primera clase 💪
          </a>
        </div>

      </div>
    </section>
  );
}
