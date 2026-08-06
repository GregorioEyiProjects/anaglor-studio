import { useCallback, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import GlobalStyles from "../../styles/global";
import DisplayTextContainer from "../DisplayText";
import studioImage01 from "../../assets/instagram-studio-01.jpg";
import studioImage02 from "../../assets/instagram-studio-02.jpg";
import aereoImage01 from "../../assets/instagram-aereo-01.jpg";
import aereoImage02 from "../../assets/instagram-aereo-02.jpg";
import useInstagramMedia from "../../hooks/useInstagramMedia";

const FOTOS = [
  {
    src: studioImage01,
    alt: "Clase en grupo dentro de AnaGlor Studio en Madrid",
    label: "Movimiento en grupo",
    href: "https://www.instagram.com/anaglorstudio/p/DavgmcTDYfy/",
  },
  {
    src: studioImage02,
    alt: "Alumnas durante una clase guiada en AnaGlor Studio",
    label: "Atención cercana",
    href: "https://www.instagram.com/anaglorstudio/p/DavgmcTDYfy/",
  },
  {
    src: aereoImage01,
    alt: "Clase de Pilates Aéreo con acompañamiento personalizado",
    label: "Pilates Aéreo",
    href: "https://www.instagram.com/anaglorstudio/p/DaGWwamjZMZ/",
  },
  {
    src: aereoImage02,
    alt: "Grupo practicando Pilates Aéreo en AnaGlor Studio",
    label: "Cuerpo y control",
    href: "https://www.instagram.com/anaglorstudio/p/DaGWwamjZMZ/",
  },
];

const IMAGE_POSITIONS = [
  "object-center",
  "object-center",
  "object-center",
  "object-bottom",
];

const Galeria = () => {
  const railRef = useRef(null);
  const [puedeAnterior, setPuedeAnterior] = useState(false);
  const [puedeSiguiente, setPuedeSiguiente] = useState(false);
  const { media: mediaSincronizada } = useInstagramMedia();

  const fotos =
    mediaSincronizada.length > 0 ? mediaSincronizada.slice(0, 4) : FOTOS;

  const actualizarControles = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;

    setPuedeAnterior(rail.scrollLeft > 4);
    setPuedeSiguiente(
      rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 4,
    );
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const frame = window.requestAnimationFrame(actualizarControles);

    rail.addEventListener("scroll", actualizarControles, { passive: true });
    window.addEventListener("resize", actualizarControles);

    return () => {
      window.cancelAnimationFrame(frame);
      rail.removeEventListener("scroll", actualizarControles);
      window.removeEventListener("resize", actualizarControles);
    };
  }, [actualizarControles, fotos.length]);

  const moverCarrusel = (direccion) => {
    const rail = railRef.current;
    if (!rail) return;

    const tarjetas = [...rail.querySelectorAll("a")];

    const indiceActual = tarjetas.reduce((masCercano, tarjeta, index) => {
      const distanciaActual = Math.abs(tarjeta.offsetLeft - rail.scrollLeft);
      const distanciaMasCercana = Math.abs(
        tarjetas[masCercano].offsetLeft - rail.scrollLeft,
      );
      return distanciaActual < distanciaMasCercana ? index : masCercano;
    }, 0);

    const siguienteIndice = Math.min(
      Math.max(indiceActual + direccion, 0),
      tarjetas.length - 1,
    );

    const inicioCarrusel = tarjetas[0]?.offsetLeft ?? 0;
    const destino = tarjetas[siguienteIndice].offsetLeft - inicioCarrusel;

    rail.scrollBy({
      left: destino - rail.scrollLeft,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="galeria"
      className={`${GlobalStyles.container} py-12 lg:py-16`}
    >
      <div
        className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end"
        data-reveal
      >
        <DisplayTextContainer
          spanText="Dentro de AnaGlor"
          h2Text="Un estudio"
          emText="en movimiento"
        />

        <p className="mb-4 max-w-md text-sm leading-6 text-ag-muted lg:text-right">
          Luz natural, grupos reducidos y una práctica acompañada de cerca en
          cada sesión.
        </p>
      </div>

      <div className="mt-5 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => moverCarrusel(-1)}
          disabled={!puedeAnterior}
          className="liquid-glass-control grid size-11 place-items-center rounded text-ag-muted transition-colors hover:border-ag-gold hover:text-ag-gold disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-white/15 disabled:hover:text-ag-muted"
          aria-label="Ver fotografías anteriores"
          title="Fotografías anteriores"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        <button
          type="button"
          onClick={() => moverCarrusel(1)}
          disabled={!puedeSiguiente}
          className="liquid-glass-control grid size-11 place-items-center rounded text-ag-muted transition-colors hover:border-ag-gold hover:text-ag-gold disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-white/15 disabled:hover:text-ag-muted"
          aria-label="Ver fotografías siguientes"
          title="Fotografías siguientes"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>

      <div
        ref={railRef}
        className="media-rail mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3"
      >
        {fotos.map((foto, index) => (
          <a
            key={foto.id || foto.label}
            href={foto.href}
            target="_blank"
            rel="noreferrer"
            className="group relative aspect-4/5 w-[72vw] max-w-[18rem] shrink-0 snap-start overflow-hidden rounded-lg border border-white/10 bg-ag-card sm:w-64 lg:w-80 lg:max-w-none"
            aria-label={`${foto.label}, ver publicación en Instagram`}
            data-reveal
            style={{ "--reveal-delay": `${index * 70}ms` }}
          >
            <img
              src={foto.src}
              alt={foto.alt}
              loading="lazy"
              decoding="async"
              className={`size-full object-cover transition-transform duration-700 group-hover:scale-[1.025] ${IMAGE_POSITIONS[index] || "object-center"}`}
              data-parallax
            />
            <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-linear-to-t from-black/85 to-transparent px-4 pb-4 pt-12 text-[10px] font-medium uppercase tracking-[0.12em] text-white sm:text-xs">
              {foto.label}
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="text-ag-gold"
              />
            </span>
          </a>
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        <a
          href="https://www.instagram.com/anaglorstudio/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-12 items-center gap-3 border border-ag-border px-5 text-sm text-white transition-colors hover:border-ag-gold hover:text-ag-gold"
        >
          <FontAwesomeIcon icon={faInstagram} className="text-lg" />
          Ver más en Instagram
        </a>
      </div>
    </section>
  );
};

export default Galeria;
