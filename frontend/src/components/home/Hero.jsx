
export default function Hero() {
  return (
    <section className="hero-section position-relative d-flex align-items-center justify-content-center text-light">

      {/* Fondo Hero */}
      <div className="position-absolute top-0 start-0 w-100 h-100">
        <img
          src="../../logo_crossfit_manager_app.png"
          alt="Atleta de CrossFit entrenando"
          className="w-100 h-100"
        />
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background:"linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.6), rgba(0,0,0,0.3))",}
          }
        />
      </div>

      {/* Contenido Hero */}
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

          <div className="d-flex gap-3 flex-wrap">
           <a href="/login" className="btn btn-primary btn-lg px-4">
              ¡Únete ahora!
            </a>

            <button
              className="btn btn-outline-light btn-lg px-4"
              onClick={() =>
                document.getElementById("InfoSection")?.scrollIntoView({ behavior: "smooth" })
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

