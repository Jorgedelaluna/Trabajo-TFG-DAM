/**
 * ======================================================
 *  FINAL CTA (Página principal)
 *  - Sección final de llamada a la acción
 *  - Refuerza el mensaje motivacional del sitio
 *  - Incluye un botón para registro
 * ======================================================
 */

export default function FinalCTA() {
  return (
    <section className="final-section text-center fade-in-up">
      <div className="final-cta-container">

        {/* Mensajes motivacionales */}
        <h2 className="final-cta-title">Entrena</h2>
        <h2 className="final-cta-title">Mejora</h2>
        <h2 className="final-cta-title highlight">Supera tus límites</h2>

        {/* Texto descriptivo */}
        <p className="final-cta-text">
          Ya seas atleta o coach, CrossFit Manager App te ayuda a llevar tu box al siguiente nivel.
        </p>

        <p className="final-cta-text">
          Únete a la comunidad y empieza a mejorar tu rendimiento desde hoy.
        </p>

        {/* Botón de registro */}
        <a href="/registro" className="btn btn-primary btn-lg mt-3 px-4 fw-bold">
          Crear cuenta
        </a>

      </div>
    </section>
  );
}
