import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/Home.css";

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
          <a href="/login" className="btn btn-primary btn-lg mt-3 shadow">
            Comienza ahora ⚡
          </a>
        </div>
      </section>

      {/* CARRUSEL */}
      <div id="crossfitCarousel" className="carousel slide mt-4" data-bs-ride="carousel">
        <div className="carousel-inner">

          <div className="carousel-item active">
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fa1%2F94%2Fe8%2Fa194e8ba5223ba2ce8df100dd477831f.jpg&f=1&nofb=1&ipt=6c2a5e71cd80e8106a69be3a26b163046a96c5acb14a0abe096b480390becda7"
              className="d-block w-100"
              alt="CrossFit"
            />
          </div>

          <div className="carousel-item">
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpaperset.com%2Fw%2Ffull%2F0%2Ff%2Ff%2F52689.jpg&f=1&nofb=1&ipt=89a6c40caa1a4e1fc2dc28ca80a3a3cbc408d8c378a2cfe2310fd332ce0bc823"
              className="d-block w-100"
              alt="Entrenamiento"
            />
          </div>

          <div className="carousel-item">
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flookaside.fbsbx.com%2Flookaside%2Fcrawler%2Fmedia%2F%3Fmedia_id%3D488972699896865&f=1&nofb=1&ipt=5abb25599b2cfd68967627eacde042cc6027d6f772212696fece72d940cedfbc"
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
        <a href="/registro" className="btn btn-primary btn-lg mt-2">
          Crear cuenta 💚
        </a>
      </section>

    </div>
  );
}

export default Home;
