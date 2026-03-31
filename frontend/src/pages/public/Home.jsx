/**
 * ======================================================
 *  PÁGINA PRINCIPAL (HOME)
 *  - Página pública principal del sitio
 *  - Compuesta por secciones modulares:
 *      Hero, Carousel, InfoSection y FinalCTA
 *  - Diseño orientado a presentación comercial
 * ======================================================
 */

import "../../styles/Home.css";

// Componentes de la página principal
import Carousel from "../../components/common/Carousel";
import FinalCTA from "../../components/common/FinalCTA";
import Hero from "../../components/common/Hero";
import InfoSection from "../../components/common/InfoSection";

export default function Home() {
  return (
    <main>
      {/* Sección principal con imagen destacada */}
      <Hero />

      {/* Carrusel de imágenes o testimonios */}
      <Carousel />

      {/* Sección informativa sobre el box */}
      <InfoSection />

      {/* Llamada a la acción final */}
      <FinalCTA />
    </main>
  );
}
