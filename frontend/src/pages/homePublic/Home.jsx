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
import Hero from "../../components/home/Hero";
import Carousel from "../../components/home/Carousel";
import InfoSection from "../../components/home/InfoSection";
import FinalCTA from "../../components/home/FinalCTA";

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
