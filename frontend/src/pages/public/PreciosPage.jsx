/**
 * ======================================================
 *  PÃ�GINA PÃšBLICA: Planes y Precios
 *  - Muestra los diferentes planes de suscripciÃ³n
 *  - PÃ¡gina estÃ¡tica orientada a informaciÃ³n comercial
 *  - Simula un pago mostrando un banner de exito
 * ======================================================
 */
import { useState } from "react";
import "../../styles/Precios.css";
import { FaDumbbell, FaFire, FaRocket } from "react-icons/fa";

export default function PreciosPage() {

  /**
   * ======================================================
   * Estado para mostrar el banner de pago simulado
   * ======================================================
   */
  const [mensajePago, setMensajePago] = useState("");

  /**
   * ======================================================
   * FunciÃ³n que simula un pago y muestra un banner temporal
   * ======================================================
   */
  const simularPago = () => {
    setMensajePago("âœ” Pago realizado con Ã©xito. Tu suscripciÃ³n estÃ¡ activa.");

    // Ocultar el banner despuÃ©s de 4 segundos
    setTimeout(() => setMensajePago(""), 4000);
  };

  return (
    <section className="precios-section d-flex align-items-center">
      <div className="container">

        {/* ======================================================
            BANNER DE PAGO SIMULADO
        ====================================================== */}
        {mensajePago && (
          <div className="alert alert-success text-center fw-bold mb-4">
            {mensajePago}
          </div>
        )}

        {/* ======================================================
            ENCABEZADO PRINCIPAL
        ====================================================== */}
        <h1 className="fw-bold text-center mb-3 text-light">Planes y Precios</h1>
        <p className="text-center text-light opacity-75 mb-5">
          Elige el plan que mejor se adapte a tu ritmo y objetivos.
        </p>

        {/* ======================================================
            TARJETAS DE PLANES
        ====================================================== */}
        <div className="row g-4">

          {/* PLAN BÃ�SICO */}
          <div className="col-md-4">
            <div className="precios-card">
              <div className="precios-icon">
                <FaDumbbell />
              </div>

              <h3 className="precios-title">Plan Básico</h3>
              <p className="precios-subtitle">2 clases por semana</p>
              <h2 className="precios-price">39€/mes</h2>

              <ul className="precios-list text-start">
                <li>Acceso a 2 clases más de prueba</li>
                <li>Acceso a todas las clases (excepto Open Box)</li>
                <li>Seguimiento inicial</li>
              </ul>

              {/* BotÃ³n que simula el pago */}
              <button className="btn btn-primary w-100 mt-3" onClick={simularPago}>
                Elegir Plan
              </button>
            </div>
          </div>

          {/* PLAN INTERMEDIO (DESTACADO) */}
          <div className="col-md-4">
            <div className="precios-card precios-popular-card">
              <div className="precio-popular">Más Popular â­�</div>

              <div className="precios-icon">
                <FaFire />
              </div>

              <h3 className="precios-title text-warning">Plan Intermedio</h3>
              <p className="precios-subtitle">3 clases por semana</p>
              <h2 className="precios-price text-warning">69€/mes</h2>

              <ul className="precios-list text-start">
                <li>Acceso a todas las clases</li>
                <li>Corrección técnica</li>
                <li>Plan de entrenamiento mensual</li>
              </ul>

              {/* BotÃ³n que simula el pago */}
              <button className="btn btn-warning w-100 mt-3 fw-bold" onClick={simularPago}>
                Elegir Plan
              </button>
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

              <ul className="precios-list text-start">
                <li>Acceso a todas las clases</li>
                <li>Acceso a Open Box</li>
                <li>Corrección técnica</li>
                <li>Plan de entrenamiento mensual</li>
              </ul>

              {/* BotÃ³n que simula el pago */}
              <button className="btn btn-primary w-100 mt-3" onClick={simularPago}>
                Elegir Plan
              </button>
            </div>
          </div>

        </div>

        {/* ======================================================
            CTA FINAL
        ====================================================== */}
        <div className="text-center mt-5">
          <a href="/registro" className="btn btn-primary btn-lg px-5">
            !Empieza hoy!
          </a>
        </div>

      </div>
    </section>
  );
}
