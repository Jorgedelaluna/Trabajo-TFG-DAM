import "../../styles/Clases.css";

export default function ClasesPage() {
  return (
    <section className="clases-section">

      <div className="container text-center mb-5">
        <h1 className="fw-bold text-light">Nuestras Clases</h1>
        <p className="text-light opacity-75">
          Entrena con nosotros y descubre el verdadero espíritu del CrossFit.
        </p>
      </div>

      {/* TARJETAS DE CLASES */}
      <div className="container">
        <div className="row g-4">

          {/* CROSSFIT */}
          <div className="col-md-4">
          <div className="card clases-card h-100 shadow">
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%2Fid%2FOIP.r7jdpwIEULmMOC0W4XtYMgHaEK%3Fpid%3DApi&f=1&ipt=18e0314ae8eae01de0a686084d08ccc921a12410c0655f90013a5fb958a659bf&ipo=images"
              className="card-img-top"
              alt="CrossFit"
            />
          <div className="card-body">
          <h3 className="fw-bold">CrossFit</h3>
          <p>
            Entrenamientos funcionales de alta intensidad que combinan fuerza, cardio y gimnasia.
          </p>
          </div>
        </div>
      </div>

        {/* HALTEROFILIA */}
        <div className="col-md-4">
          <div className="card clases-card h-100 shadow">
            <img
              src="https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=80"
              className="card-img-top"
              alt="Halterofilia"
            />
          <div className="card-body">
          <h3 className="fw-bold">Halterofilia</h3>
          <p>
            Perfecciona la técnica de los levantamientos olímpicos: snatch y clean & jerk.
          </p>
          </div>
          </div>
        </div>

        {/* Endurance */}
        <div className="col-md-4">
          <div className="card clases-card h-100 shadow">
            <img
              src="https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=800&q=80"
              className="card-img-top"
              alt="Endurance"
            />
          <div className="card-body">
          <h3 className="fw-bold">Endurance</h3>
          <p>
            Sesiones enfocadas en mejorar tu resistencia cardiovascular.
          </p>
          </div>
          </div>
        </div>

        {/* Gymnastics */}
        <div className="col-md-4">
          <div className="card clases-card h-100 shadow">
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%2Fid%2FOIP.U1ZUo1EenhcjeI1eyd1BtAHaC8%3Fpid%3DApi&f=1&ipt=70b7080b11ab51a3b1ba1c2f2a7a11663751eedbb72dcd9e8cc950d05958c31e&ipo=images"
              className="card-img-top"
              alt="Gymnastics"
            />
          <div className="card-body">
          <h3 className="fw-bold">Gymnastics</h3>
          <p>
            Mejora tus habilidades gimnásticas: dominadas, handstands y muscle-ups.
          </p>
          </div>
          </div>
        </div>

                {/* Meditación & Mobility */}
        <div className="col-md-4">
          <div className="card clases-card h-100 shadow">
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%2Fid%2FOIP.HCcmizdQk9gxqS3lv3NweQHaE8%3Fpid%3DApi&f=1&ipt=4f2ac097c890e463d5d1bb322634e50c9c25fae6729368261448b1a7304dcbc2&ipo=images"
              className="card-img-top"
              alt="Meditación & Mobility"
            />
          <div className="card-body">
          <h3 className="fw-bold">Meditación & Mobility</h3>
          <p>
            Movilidad, flexibilidad y bienestar mental para prevenir lesiones.
          </p>
          </div>
          </div>
        </div>

                {/* Open Box */}
        <div className="col-md-4">
          <div className="card clases-card h-100 shadow">
            <img
              src="../../box_crossfit.jpg"
              className="card-img-top"
              alt="Open Box"
            />
          <div className="card-body">
          <h3 className="fw-bold">Open Box</h3>
          <p>
            Espacio libre para entrenar por tu cuenta o practicar técnica.
          </p>
          </div>
          </div>
        </div>
        </div>
      </div>

      {/* TABLA DE TIPOS DE CLASES */}
      <div className="container mt-5">
        <h2 className="text-center text-light mb-4">Tipos de Clases</h2>

        <div className="table-responsive">
          <table className="table table-dark table-striped table-bordered clases-table">
            <thead className="table-warning text-dark">
              <tr>
                <th>Clase</th>
                <th>Objetivo</th>
                <th>Duración</th>
                <th>Intensidad</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CrossFit</td>
                <td>Rendimiento general</td>
                <td>60 min</td>
                <td>Alta</td>
              </tr>
              <tr>
                <td>Halterofilia</td>
                <td>Técnica y fuerza</td>
                <td>75 min</td>
                <td>Media</td>
              </tr>
              <tr>
                <td>Endurance</td>
                <td>Resistencia</td>
                <td>45–60 min</td>
                <td>Alta</td>
              </tr>
              <tr>
                <td>Gymnastics</td>
                <td>Control corporal</td>
                <td>60 min</td>
                <td>Media</td>
              </tr>
              <tr>
                <td>Meditación & Mobility</td>
                <td>Recuperación</td>
                <td>45 min</td>
                <td>Baja</td>
              </tr>
              <tr>
                <td>Open Box</td>
                <td>Entreno libre</td>
                <td>Variable</td>
                <td>Adaptable</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-5">
        <a href="/registro" className="btn btn-primary btn-lg fw-bold px-5">
          Únete ahora 💪
        </a>
      </div>

    </section>
  );
}
