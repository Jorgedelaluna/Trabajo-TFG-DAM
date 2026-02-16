import "../../styles/Horarios.css";
import { FaClock } from "react-icons/fa";

export default function HorariosPage() {
  return (
    <section className="horarios-section">
      <div className="container">

        {/* TÍTULO */}
        <div className="text-center mb-5">
          <h1 className="fw-bold text-light">Horarios del Box</h1>
          <p className="text-light opacity-75">
            Consulta nuestros horarios y encuentra el momento perfecto para entrenar.
          </p>
        </div>

        {/* TARJETAS */}
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
                <p className="text-light">
                  Sesiones especiales de:
                </p>
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

        {/* CTA */}
        <div className="text-center mt-5">
          <a href="/registro" className="btn btn-primary btn-lg fw-bold px-5">
            Reserva tu primera clase 💪
          </a>
        </div>

      </div>
    </section>
  );
}
