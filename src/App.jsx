// src/app.jsx

import NavBar from "./components/NavBar/NavBar";
import Hero from "./components/Hero/Hero";
import Sobre from "./components/Sobre/Sobre";
import Disciplinas from "./components/Disciplinas/Disciplinas";
import Schedules from "./components/Horarios/Schedules";
import Events from "./components/Eventos/Events";
import Normas from "./components/Normas/Normas";
import Contact from "./components/Contacto/Contacto";
import Footer from "./components/Footer/Footer";
import Galeria from "./components/Galeria/Galeria";

function App() {
  return (
    <div className="bg-ag-dark text-white scroll-smooth">
      <NavBar />
      <Hero />
      <Sobre />
      <Galeria />
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
