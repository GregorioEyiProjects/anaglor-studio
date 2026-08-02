import ButtonComponent from "../Global/ButtonComponnent";
import Historias from "../Historias/Historias";
import STUDIO_CONFIG from "../../config/studio";
import useConfirmedStudentCount from "../../hooks/useConfirmedStudentCount";
import useCountUp from "../../hooks/useCountUp";
import heroImage from "../../assets/anaglor-studio-hero-v3.png";

const whatsappLink = `https://wa.me/${STUDIO_CONFIG.whatsapp}?text=${encodeURIComponent(
  "Hola, me gustaría reservar mi primera clase en AnaGlor Studio.",
)}`;

const Hero = () => {
  const { count: confirmedStudentCount } = useConfirmedStudentCount();
  const animatedStudentCount = useCountUp(confirmedStudentCount);
  const formattedStudentCount = new Intl.NumberFormat("es-ES").format(
    confirmedStudentCount,
  );
  const formattedAnimatedStudentCount = new Intl.NumberFormat("es-ES").format(
    animatedStudentCount,
  );

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-black text-white lg:items-center"
    >
      <img
        src={heroImage}
        alt="Sala de Pilates Reformer de AnaGlor Studio"
        className="hero-image absolute inset-0 h-full w-full object-cover object-[58%_center] sm:object-[54%_center] lg:object-center"
        data-parallax
      />
      <div
        className="absolute inset-0 bg-black/45 lg:bg-black/30"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-6 pb-12 pt-28 lg:px-8 lg:py-20">
        <div className="hero-copy max-w-2xl" data-reveal>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-ag-gold-light">
            Madrid · Av. de Bruselas 38
          </p>
          <h1 className="font-display text-6xl font-light leading-[0.9] text-white lg:text-8xl">
            AnaGlor{" "}
            <em className="block font-light text-ag-gold-light">Studio</em>
          </h1>

          <div
            className="my-6 flex max-w-xl items-end justify-center gap-4 border-y border-white/20 py-3 lg:justify-start lg:py-4"
            aria-label={`${formattedStudentCount} alumnos con matrícula confirmada`}
          >
            <data
              value={confirmedStudentCount}
              className="min-w-24 text-center font-display text-7xl font-light tabular-nums leading-none text-ag-gold-light sm:text-8xl lg:min-w-32 lg:text-9xl"
              aria-hidden="true"
            >
              {formattedAnimatedStudentCount}
            </data>
            <span
              className="pb-2 text-xs font-semibold uppercase tracking-[0.28em] text-white lg:pb-3 lg:text-sm"
              aria-hidden="true"
            >
              Alumnos
            </span>
          </div>

          <p className="mt-6 max-w-xl text-base leading-7 text-[#efede8] lg:text-lg lg:leading-8">
            Pilates, barre y movimiento consciente en grupos reducidos, con
            acompañamiento cercano y atención a tu cuerpo.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonComponent
              text="Reservar primera clase"
              href={whatsappLink}
              className="justify-center border-ag-gold bg-ag-gold font-semibold text-black hover:bg-ag-gold-light hover:text-black"
            />
            <ButtonComponent
              text="Ver horarios"
              href="#horarios"
              className="justify-center hover:border-white hover:text-white"
            />
          </div>

          <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/20 pt-5 text-xs uppercase tracking-[0.14em] text-[#d8d4cb]">
            <li>Grupos reducidos</li>
            <li>Atención personalizada</li>
            <li>Sin matrícula</li>
          </ul>

          <Historias compact />
        </div>
      </div>

      <a
        href="#sobre"
        className="absolute bottom-5 right-6 hidden items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white lg:flex"
      >
        Descubrir
        <span className="block h-px w-12 bg-white/50" />
      </a>
    </section>
  );
};

export default Hero;
