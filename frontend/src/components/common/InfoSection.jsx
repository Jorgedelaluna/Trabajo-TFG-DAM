/**
 * ======================================================
 *  INFO SECTION (Página principal)
 *  - Sección informativa con tres tarjetas
 *  - Explica qué es CrossFit, sus beneficios y datos curiosos
 *  - Incluye un ID para permitir scroll desde el Hero
 * ======================================================
 */

export default function InfoSection() {
  return (
    <section
      id="InfoSection"
      className="app-background info-section d-flex align-items-center"
    >
      <div className="container">
        <div className="row text-center g-4">

          {/* ======================================================
              TARJETA 1 — ¿Qué es CrossFit?
          ====================================================== */}
          <div className="col-md-4">
            <div className="info-card">
              <div className="info-icon">🏋️‍♂️</div>
              <h3 className="info-title">¿Qué es CrossFit?</h3>

              <ul className="info-list text-start">
                <li>CrossFit es un método de entrenamiento fitness creado en Estados Unidos.</li>
                <li>Basado en ejercicios utilizados por cuerpos militares, policiales y de bomberos.</li>
                <li>Entrenamientos de alta intensidad adaptados a todos los niveles.</li>
                <li>Combina fuerza, cardio y gimnasia.</li>
              </ul>
            </div>
          </div>

          {/* ======================================================
              TARJETA 2 — Beneficios
          ====================================================== */}
          <div className="col-md-4">
            <div className="info-card">
              <div className="info-icon">💥</div>
              <h3 className="info-title">Beneficios</h3>

              <ul className="info-list text-start">
                <li>Incremento de fuerza y resistencia.</li>
                <li>Entrenamientos dinámicos y motivadores.</li>
                <li>Comunidad fuerte y unida.</li>
                <li>Resultados visibles rápidamente.</li>
              </ul>
            </div>
          </div>

          {/* ======================================================
              TARJETA 3 — Datos curiosos
          ====================================================== */}
          <div className="col-md-4">
            <div className="info-card">
              <div className="info-icon">📊</div>
              <h3 className="info-title">Datos curiosos</h3>

              <ul className="info-list text-start">
                <li>Más de 15.000 boxes en el mundo.</li>
                <li>Entrenamientos adaptables a cualquier nivel.</li>
                <li>Basado en métricas reales de rendimiento.</li>
                <li>Ideal para mejorar salud y energía.</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
