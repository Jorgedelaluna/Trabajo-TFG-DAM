import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Home.css";

import Hero from "../../components/home/Hero";
import Carousel from "../../components/home/Carousel";
import InfoSection from "../../components/home/InfoSection";
import FinalCTA from "../../components/home/FinalCTA";

function Home() {
  return (
    <div>
      <main>
      <Hero />
      <Carousel />
      <InfoSection />
      <FinalCTA />
      </main>
    </div>

  );
}

export default Home;
