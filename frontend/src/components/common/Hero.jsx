/**
 * ======================================================
 *  HERO SECTION (Página principal)
 *  - Sección destacada con imagen de fondo
 *  - Incluye título, subtítulo y llamadas a la acción
 *  - Fondo con overlay para mejorar la legibilidad
 * ======================================================
 */

export default function Hero() {
  return (
    <section className="hero-section position-relative d-flex align-items-center justify-content-center text-light">

      {/* ======================================================
          CONTENIDO PRINCIPAL DEL HERO
      ====================================================== */}
      <div className="container position-relative z-3 py-5">
        <div className="col-md-7">

          <p className="text-warning text-uppercase fw-bold mb-3">
            Supera tus límites
          </p>

          <h1 className="display-3 fw-bold text-uppercase mb-4">
            Transforma tu cuerpo y tu mente
          </h1>

          <p className="lead">
            Únete a la comunidad de CrossFit más fuerte.
          </p>

          <p className="lead">
            Entrenamientos de alta intensidad, coaching experto y resultados reales.
          </p>

          {/* Botones de acción */}
          <div className="d-flex gap-3 flex-wrap">
            <a href="/login" className="btn btn-primary btn-lg px-4">
              ¡Únete ahora!
            </a>

            <button
              className="btn btn-outline-light btn-lg px-4"
              onClick={() =>
                document
                  .getElementById("InfoSection")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Conoce más
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
