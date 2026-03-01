export default function InfoSection() {
  return (
    <section id="InfoSection" className="app-background info-section d-flex align-items-center">
      <div className="container">
        <div className="row text-center g-4">

          {/* CARD 1 */}
          <div className="col-md-4">
            <div className="info-card">
              <div className="info-icon">🏋️‍♂️</div>
              <h3 className="info-title">¿Qué es CrossFit?</h3>
              <ul className="info-list text-start">
                <li>CrossFit es un método de entrenamiento fitness creado en Estados Unidos.</li>
                <li>Es un entrenamiento basado en los ejercicios de cuerpos militares, policiales y de bomberos.</li>
                <li>Alta intensidad para todos los niveles.</li>
                <li>Combina fuerza, cardio y gimnasia.</li>
              </ul>
            </div>
          </div>

          {/* CARD 2 */}
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

          {/* CARD 3 */}
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
