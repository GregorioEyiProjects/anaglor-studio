import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import studioImage from "../../assets/instagram-studio-02.jpg";

const PRINCIPIOS = [
  {
    number: "01",
    title: "Precisión",
    text: "Indicaciones claras para entender cada movimiento.",
  },
  {
    number: "02",
    title: "Progresión",
    text: "Una práctica que avanza contigo, sin prisas ni comparaciones.",
  },
  {
    number: "03",
    title: "Presencia",
    text: "Grupos reducidos para acompañarte de verdad.",
  },
];

const EditorialStatement = () => {
  return (
    <section className="bg-[#f1f0ec] text-[#111111]" data-reveal>
      <div className="mx-auto grid max-w-[1440px] lg:min-h-[46rem] lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative min-h-[32rem] overflow-hidden lg:min-h-full">
          <img
            src={studioImage}
            alt="Clase guiada en AnaGlor Studio"
            loading="lazy"
            decoding="async"
            className="editorial-media absolute inset-0 size-full object-cover"
            data-parallax
          />
          <span className="absolute bottom-5 left-6 text-[10px] font-medium uppercase tracking-[0.2em] text-white lg:bottom-7 lg:left-8">
            Madrid · AnaGlor Studio
          </span>
        </div>

        <div className="flex flex-col justify-center px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7f6335]">
            El método AnaGlor
          </p>
          <h2 className="mt-7 max-w-xl text-4xl font-light leading-[1.08] sm:text-5xl lg:text-6xl">
            Fuerza para tu día. <em className="font-light text-[#947441]">Calma para tu cuerpo.</em>
          </h2>
          <p className="mt-7 max-w-lg text-base leading-7 text-[#575550]">
            Cada sesión combina técnica, escucha y atención personal para que
            el movimiento se convierta en una parte sostenible de tu vida.
          </p>

          <ol className="mt-10 border-t border-black/20">
            {PRINCIPIOS.map((principio) => (
              <li
                key={principio.number}
                className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-black/20 py-5 sm:grid-cols-[3rem_8rem_1fr] sm:items-baseline"
              >
                <span className="text-[10px] font-semibold text-[#947441]">
                  {principio.number}
                </span>
                <strong className="text-sm font-semibold">
                  {principio.title}
                </strong>
                <span className="col-start-2 text-sm leading-6 text-[#66635d] sm:col-start-auto">
                  {principio.text}
                </span>
              </li>
            ))}
          </ol>

          <a
            href="#disciplinas"
            className="mt-9 inline-flex w-fit items-center gap-3 border-b border-black pb-2 text-sm font-semibold transition-colors hover:border-[#947441] hover:text-[#947441]"
          >
            Explorar disciplinas
            <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default EditorialStatement;
