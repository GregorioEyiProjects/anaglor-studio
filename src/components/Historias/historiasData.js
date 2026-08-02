import studioImage01 from "../../assets/instagram-studio-01.jpg";
import studioImage02 from "../../assets/instagram-studio-02.jpg";
import aereoImage01 from "../../assets/instagram-aereo-01.jpg";
import aereoImage02 from "../../assets/instagram-aereo-02.jpg";

const HISTORIAS = [
  {
    id: "estudio",
    title: "El estudio",
    cover: studioImage01,
    slides: [
      {
        id: "estudio-1",
        src: studioImage01,
        alt: "Clase en grupo dentro de AnaGlor Studio",
        eyebrow: "AnaGlor por dentro",
        title: "Un espacio para moverte a tu ritmo",
        body: "Luz natural, material cuidado y grupos reducidos para acompañarte de cerca.",
      },
      {
        id: "estudio-2",
        src: studioImage02,
        alt: "Alumnas durante una sesión guiada en AnaGlor Studio",
        eyebrow: "Cada semana",
        title: "Práctica compartida, atención personal",
        body: "La energía del grupo con correcciones adaptadas a cada cuerpo.",
      },
    ],
  },
  {
    id: "clases",
    title: "Clases",
    cover: aereoImage01,
    slides: [
      {
        id: "clases-1",
        src: aereoImage01,
        alt: "Clase de Pilates Aéreo con acompañamiento personalizado",
        eyebrow: "Pilates aéreo",
        title: "Fuerza, movilidad y una nueva perspectiva",
        body: "Una práctica progresiva para explorar el movimiento con seguridad.",
      },
      {
        id: "clases-2",
        src: aereoImage02,
        alt: "Grupo practicando Pilates Aéreo en AnaGlor Studio",
        eyebrow: "Grupos reducidos",
        title: "Más espacio para aprender",
        body: "Sesiones cercanas donde cada indicación puede convertirse en avance.",
      },
    ],
  },
  {
    id: "comunidad",
    title: "Comunidad",
    cover: studioImage02,
    slides: [
      {
        id: "comunidad-1",
        src: studioImage02,
        alt: "Comunidad AnaGlor practicando en el estudio",
        eyebrow: "Nuestra comunidad",
        title: "Moverse también es encontrarse",
        body: "Un ambiente tranquilo, cercano y sin comparaciones.",
      },
      {
        id: "comunidad-2",
        src: aereoImage02,
        alt: "Alumnas disfrutando de una clase de Pilates Aéreo",
        eyebrow: "AnaGlor Studio",
        title: "Constancia que se disfruta",
        body: "Celebramos cada proceso y cada forma de habitar el cuerpo.",
      },
    ],
  },
];

export default HISTORIAS;
