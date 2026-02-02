import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Home.css";

function Home() {
  return (
    <div>

      {/* HERO */}
      <section className="hero-section text-light text-center d-flex align-items-center">
        <div className="container fade-in">
          <h1 className="display-3 fw-bold">CrossFit Manager App 💪</h1>
          <p className="lead mt-3">
            Gestiona tu box, tus atletas y tus clases con la energía del CrossFit.
          </p>
          <a href="/auth" className="btn btn-primary btn-lg mt-3 shadow">
            Comienza ahora ⚡
          </a>
        </div>
      </section>

      {/* CARRUSEL */}
      <div id="crossfitCarousel" className="carousel slide mt-4" data-bs-ride="carousel">
        <div className="carousel-inner">

          <div className="carousel-item active">
            <img
              src="https://images.unsplash.com/photo-1517964105217-8b2e0b0b0f63?auto=format&fit=crop&w=1400&q=80"
              className="d-block w-100"
              alt="CrossFit"
            />
          </div>

          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1400&q=80"
              className="d-block w-100"
              alt="Entrenamiento"
            />
          </div>

          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1518611012118-f0c5d1f0b4f8?auto=format&fit=crop&w=1400&q=80"
              className="d-block w-100"
              alt="Box"
            />
          </div>

        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#crossfitCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button className="carousel-control-next" type="button" data-bs-target="#crossfitCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      {/* SECCIÓN DE INFORMACIÓN */}
      <div className="container mt-5 fade-in-up">
        <div className="row text-center">

          <div className="col-md-4 mb-4">
            <div className="card shadow h-100 hover-card">
              <div className="card-body">
                <h3 className="fw-bold">¿Qué es CrossFit?🏋️‍♂️</h3>
                <ul className="mt-3 text-start">
                  <li>CrossFit es un sistema de entrenamineto basado en movimientos funcionales, variados y de alta intensidad.</li>
                  <li>Combina fuerza, resistencia, gimnasia y trabajo metabólico para mejorar el rendimiento global.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow h-100 hover-card">
              <div className="card-body">
                <h3 className="fw-bold">Beneficios💥</h3>
                <ul className="mt-3 text-start">
                  <li>Incremento de fuerza y resistencia</li>
                  <li>Entrenamientos dinámicos y motivadores</li>
                  <li>Comunidad fuerte y unida</li>
                  <li>Resultados visibles rápidamente</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow h-100 hover-card">
              <div className="card-body">
                <h3 className="fw-bold">Datos curiosos📊</h3>
                <ul className="mt-3 text-start">
                  <li>Más de 15.000 boxes en el mundo</li>
                  <li>Entrenamientos adaptables a cualquier nivel</li>
                  <li>Basado en métricas reales de rendimiento</li>
                  <li>Ideal para mejorar salud y energía</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* CTA FINAL */}
      <section className="text-center py-5 bg-light mt-5 fade-in-up">
        <h2 className="fw-bold">Entrena. Mejora. Supera tus límites.🚀</h2>
        <p className="mt-3">
          Ya seas Atleta o Coach, CrossFit Manager App te ayuda a llevar tu box al siguiente nivel.
        </p>
        <p className="mt-3">
          Únete a la comunidad CrossFit y lleva tu rendimiento al siguiente nivel.
        </p>
        <a href="/auth" className="btn btn-success btn-lg mt-2">
          Crear cuenta 💚
        </a>
      </section>

    </div>
  );
}

export default Home;
