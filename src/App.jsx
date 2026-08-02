// src/app.jsx

import NavBar from "./components/NavBar/NavBar";
import Hero from "./components/Hero/Hero";
import Sobre from "./components/Sobre/Sobre";
import Galeria from "./components/Galeria/Galeria";
import EditorialStatement from "./components/Editorial/EditorialStatement";
import Disciplinas from "./components/Disciplinas/Disciplinas";
import Schedules from "./components/Horarios/Schedules";
import Normas from "./components/Normas/Normas";
import Contact from "./components/Contacto/Contacto";
import Footer from "./components/Footer/Footer";
import SmoothExperience from "./components/Global/SmoothExperience";

function App() {
  return (
    <div className="bg-ag-dark text-white scroll-smooth">
      <SmoothExperience />
      <NavBar />
      <Hero />
      <Sobre />
      <Galeria />
      <EditorialStatement />
      <Disciplinas />
      <Schedules />
      {/* <Events /> */}
      <Normas />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
