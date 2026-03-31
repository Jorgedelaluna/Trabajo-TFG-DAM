/**
 * ======================================================
 *  FOOTER (Sitio público y privado)
 *  - Incluye información del box, horarios, contacto y redes
 *  - Se muestra en todas las páginas
 *  - Contenido estático orientado a presentación comercial
 * ======================================================
 */

import { FaDumbbell, FaClock, FaMapMarkerAlt, FaPhone, FaInstagram, FaFacebook, FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer-section bg-dark text-light pt-5 mt-5">
      <div className="container">

        <div className="row gy-4">

          {/* ======================================================
              LOGO + DESCRIPCIÓN
          ====================================================== */}
          <div className="col-md-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <FaDumbbell className="text-primary fs-3" />
              <span className="fw-bold text-uppercase fs-5">
                CrossFit <span className="text-primary">Manager App</span>
              </span>
            </div>

            <p className="text-light opacity-75">
              Transformando vidas a través del fitness funcional de alta intensidad desde 2018.
            </p>
          </div>

          {/* ======================================================
              HORARIOS
          ====================================================== */}
          <div className="col-md-2">
            <h5 className="text-uppercase mb-3">Horarios</h5>
            <p className="mb-1">
              <FaClock className="text-primary me-2" />
              Lun - Vie: 9:00 - 22:00
            </p>
            <p className="mb-1">
              <FaClock className="text-primary me-2" />
              Sábado: 10:00 - 14:00
            </p>
            <p className="mb-1">
              <FaClock className="text-primary me-2" />
              Domingo: Cerrado
            </p>
          </div>

          {/* ======================================================
              CONTACTO
          ====================================================== */}
          <div className="col-md-3">
            <h5 className="text-uppercase mb-3">Contacto</h5>
            <p className="mb-1">
              <FaMapMarkerAlt className="text-primary me-2" />
              Calle Ejemplo 123, Madrid
            </p>
            <p className="mb-1">
              <FaPhone className="text-primary me-2" />
              +34 912 666 678
            </p>
          </div>

          {/* ======================================================
              REDES SOCIALES
          ====================================================== */}
          <div className="col-md-3">
            <h5 className="text-uppercase mb-3">Síguenos</h5>

            <div className="d-flex gap-3 fs-4">
              <a
                href="#"
                className="text-light opacity-75 hover-primary"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="text-light opacity-75 hover-primary"
                rel="noopener noreferrer"
              >
                <FaFacebook />
              </a>

              <a
                href="#"
                className="text-light opacity-75 hover-primary"
                rel="noopener noreferrer"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

        </div>

        {/* ======================================================
            COPYRIGHT
        ====================================================== */}
        <div className="text-center opacity-75 mt-4 pt-3 border-top border-secondary">
          <p className="mb-0">
            © {new Date().getFullYear()} CrossFit Manager App. Todos los derechos reservados.
          </p>
        </div>

      </div>
    </footer>
  );
}
