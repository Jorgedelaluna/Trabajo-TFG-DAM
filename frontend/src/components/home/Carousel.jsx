
export default function Carousel() {
  return (
    <div id="crossfitCarousel" className="carousel slide carousel-section" data-bs-ride="carousel">

      <div className="carousel-inner">

        {/* Imagen Box CrossFit */}
        <div className="carousel-item active">
          <img
            src="../../box_crossfit.jpg"
            className="d-block w-100 carousel-img"
            alt="Box CrossFit"
          />
        </div>

        {/* Imagen Entrenamiento */}
        <div className="carousel-item">
          <img
            src="../../entrenamiento_crossfit.jpg"
            className="d-block w-100 carousel-img"
            alt="Entrenamiento"
          />
        </div>

        {/* Imagen Entrenamiento 1 */}
        <div className="carousel-item">
          <img
            src="../../entrenamiento_crossfit1.jpg"
            className="d-block w-100 carousel-img"
            alt="Entrenamiento 1"
          />
        </div>

      </div>

      {/* Botón anterior */}
      <button className="carousel-control-prev" type="button" data-bs-target="#crossfitCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon"></span>
      </button>

      {/* Botón siguiente */}
      <button className="carousel-control-next" type="button" data-bs-target="#crossfitCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon"></span>
      </button>

    </div>
  );
}

