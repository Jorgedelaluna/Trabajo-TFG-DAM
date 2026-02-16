import "../../styles/Precios.css";
import { FaDumbbell, FaFire, FaRocket } from "react-icons/fa";

export default function PreciosPage() {
  return (
    <section className="precios-section d-flex align-items-center">
      <div className="container">

        <h1 className="fw-bold text-center mb-3 text-light">Bonos y Créditos</h1>
        <p className="text-center text-light opacity-75 mb-5">
          Elige el plan que mejor se adapte a tu ritmo y objetivos.
        </p>

        <div className="row g-4">

          {/* PLAN BÁSICO */}
          <div className="col-md-4">
            <div className="precios-card">
              <div className="precios-icon">
                <FaDumbbell />
              </div>
              <h3 className="pricing-title">Plan Básico</h3>
              <p className="pricing-subtitle">2 clases por semana</p>
              <h2 className="pricing-price">39€/mes</h2>
              <p></p>
              <ul className="pricing-list text-start">
                <li>Acceso a 2 clases más de prueba</li>
                <li>Acceso a todas las clases (excepto Open Box)</li>
                <li>Seguimiento inicial</li>
              </ul>

              <a href="/registro" className="btn btn-primary w-100 mt-3">
                Elegir Plan
              </a>
            </div>
          </div>

          {/* PLAN INTERMEDIO (DESTACADO) */}
          <div className="col-md-4">
            <div className="precios-card">
              <div className="precio-popular">Más Popular ⭐</div>
              <div className="precios-icon">
                <FaFire />
              </div>
              <h3 className="precios-title text-warning">Plan Intermedio</h3>
              <p className="precios-subtitle">3 clases por semana</p>
              <h2 className="precios-price text-warning">49€/mes</h2>
              <p></p>
              <ul className="precios-list text-start">
                <li>Acceso a todas las clases</li>
                <li>Corrección técnica</li>
                <li>Plan de entrenamiento mensual</li>
              </ul>

              <a href="/registro" className="btn btn-warning w-100 mt-3 fw-bold">
                Elegir Plan
              </a>
            </div>
          </div>

          {/* PLAN ILIMITADO */}
          <div className="col-md-4">
            <div className="precios-card">
              <div className="precios-icon">
                <FaRocket />  
              </div>
              <h3 className="precios-title">Plan Ilimitado</h3>
              <p className="precios-subtitle">Clases ilimitadas</p>
              <h2 className="precios-price">95€/mes</h2>
              <p></p>
              <ul className="precios-list text-start">
                <li>Acceso a todas las clases</li>
                <li>Acceso a Open Box</li>
                <li>Corrección técnica</li>
                <li>Plan de entrenamiento mensual</li>
              </ul>

              <a href="/registro" className="btn btn-primary w-100 mt-3">
                Elegir Plan
              </a>
            </div>
          </div>

        </div>

        <div className="text-center mt-5">
          <a href="/registro" className="btn btn-primary btn-lg px-5">
            ¡Empieza hoy! <FaRocket />
          </a>
        </div>

      </div>
    </section>
  );
}
