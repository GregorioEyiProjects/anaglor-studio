import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faPause,
  faPlay,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import GlobalStyles from "../../styles/global";
import DisplayTextContainer from "../DisplayText";
import useInstagramMedia from "../../hooks/useInstagramMedia";
import HISTORIAS from "../../data/historiaData";

const STORY_DURATION = 6000; // Duración de cada historia en milisegundos

const Historias = ({ compact = false }) => {
  const [historiaActiva, setHistoriaActiva] = useState(null);
  const [slideActivo, setSlideActivo] = useState(0);
  const [pausada, setPausada] = useState(false);
  const dialogRef = useRef(null);
  const { stories } = useInstagramMedia();

  const colecciones = useMemo(() => {
    if (stories.length === 0) return HISTORIAS;

    return [
      {
        id: "ahora",
        title: "Ahora",
        cover: stories[0].src,
        slides: stories.map((item) => ({
          id: item.id,
          src: item.src,
          alt: item.alt,
          eyebrow: "Lo último del estudio",
          title: item.label,
          body: "Una mirada a lo que está pasando hoy en AnaGlor Studio.",
        })),
      },
      ...HISTORIAS,
    ];
  }, [stories]);

  const historia = useMemo(
    () => colecciones.find((item) => item.id === historiaActiva),
    [colecciones, historiaActiva],
  );

  const cerrar = useCallback(() => {
    setHistoriaActiva(null);
    setSlideActivo(0);
    setPausada(false);
  }, []);

  const abrir = useCallback((id) => {
    setHistoriaActiva(id);
    setSlideActivo(0);
    setPausada(false);
  }, []);

  const siguiente = useCallback(() => {
    if (!historia) return;
    if (slideActivo < historia.slides.length - 1) {
      setSlideActivo((actual) => actual + 1);
      return;
    }

    const indiceHistoria = colecciones.findIndex(
      (item) => item.id === historia.id,
    );
    const siguienteHistoria = colecciones[indiceHistoria + 1];
    if (siguienteHistoria) abrir(siguienteHistoria.id);
    else cerrar();
  }, [abrir, cerrar, colecciones, historia, slideActivo]);

  const anterior = useCallback(() => {
    if (!historia) return;
    if (slideActivo > 0) {
      setSlideActivo((actual) => actual - 1);
      return;
    }

    const indiceHistoria = colecciones.findIndex(
      (item) => item.id === historia.id,
    );
    const historiaAnterior = colecciones[indiceHistoria - 1];
    if (historiaAnterior) {
      setHistoriaActiva(historiaAnterior.id);
      setSlideActivo(historiaAnterior.slides.length - 1);
    }
  }, [colecciones, historia, slideActivo]);

  useEffect(() => {
    if (!historia) return undefined;

    const previo = document.body.style.overflow;
    const appRoot = document.getElementById("root");
    const estabaInerte = appRoot?.hasAttribute("inert");
    document.body.style.overflow = "hidden";
    appRoot?.setAttribute("inert", "");
    dialogRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") cerrar();
      if (event.key === "ArrowRight") siguiente();
      if (event.key === "ArrowLeft") anterior();
      if (event.key === " ") {
        event.preventDefault();
        setPausada((actual) => !actual);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previo;
      if (!estabaInerte) appRoot?.removeAttribute("inert");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [anterior, cerrar, historia, siguiente]);

  useEffect(() => {
    if (!historia || pausada) return undefined;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return undefined;

    const timer = window.setTimeout(siguiente, STORY_DURATION);
    return () => window.clearTimeout(timer);
  }, [historia, pausada, siguiente, slideActivo]);

  const slide = historia?.slides[slideActivo];

  return (
    <>
      {compact ? (
        <div id="historias" className="mt-5 border-t border-white/15 pt-4">
          <div className="mb-3 flex items-center justify-between gap-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ag-gold-light">
              Historias destacadas
            </p>
            <span className="text-[10px] text-white/60">Toca para ver</span>
          </div>
          <div className="story-rail flex max-w-full gap-3 overflow-x-auto pb-1 pt-1 sm:gap-4">
            {colecciones.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => abrir(item.id)}
                className="story-cover group flex w-14 shrink-0 flex-col items-center gap-1.5 text-center"
                aria-label={`Abrir historias: ${item.title}`}
              >
                <span className="story-cover-ring relative grid size-12 place-items-center rounded-full p-0.5 sm:size-14">
                  <span className="size-full overflow-hidden rounded-full border-2 border-black/75 bg-ag-card">
                    <img
                      src={item.cover}
                      alt=""
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </span>
                </span>
                <span className="w-full truncate text-[10px] font-medium text-default-text transition-colors group-hover:text-ag-gold">
                  {item.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <section
          id="historias"
          className={`${GlobalStyles.container} py-10 lg:py-16`}
        >
          <div
            className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end"
            data-reveal
          >
            <DisplayTextContainer
              spanText="Historias del estudio"
              h2Text="Más cerca"
              emText="de AnaGlor"
            />
            <p className="mb-4 max-w-md text-sm leading-6 text-ag-muted lg:text-right">
              Clases, novedades y pequeños momentos del estudio, reunidos aquí
              para que siempre puedas volver a verlos.
            </p>
          </div>

          <div className="story-rail mt-7 flex gap-6 overflow-x-auto pb-3 pt-1 sm:gap-8">
            {colecciones.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => abrir(item.id)}
                className="story-cover group flex w-23 shrink-0 flex-col items-center gap-3 text-center"
                aria-label={`Abrir historias: ${item.title}`}
                data-reveal
                style={{ "--reveal-delay": `${index * 80}ms` }}
              >
                <span className="story-cover-ring relative grid size-21] place-items-center rounded-full p-0.75">
                  <span className="size-full overflow-hidden rounded-full border-[3px] border-ag-dark bg-ag-card">
                    <img
                      src={item.cover}
                      alt=""
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </span>
                </span>
                <span className="text-xs font-medium text-default-text transition-colors group-hover:text-ag-gold">
                  {item.title}
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      {historia &&
        slide &&
        createPortal(
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Historias: ${historia.title}`}
            tabIndex={-1}
            className="fixed inset-0 z-80 grid place-items-center bg-black/95 p-0 outline-none sm:p-5"
            data-lenis-prevent
          >
            <button
              type="button"
              onClick={cerrar}
              className="absolute right-4 top-4 z-20 grid size-11 place-items-center border border-white/25 bg-black/50 text-lg text-white transition-colors hover:border-ag-gold hover:text-ag-gold sm:right-6 sm:top-6"
              aria-label="Cerrar historias"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>

            <button
              type="button"
              onClick={anterior}
              className="absolute left-3 z-20 hidden size-12 place-items-center border border-white/20 bg-black/50 text-white transition-colors hover:border-ag-gold hover:text-ag-gold sm:grid lg:left-8"
              aria-label="Historia anterior"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            <article className="story-viewer relative h-svh w-full max-w-124 overflow-hidden bg-ag-card sm:h-[min(86svh,54rem)] sm:aspect-9/16 sm:w-auto">
              <img
                key={slide.id}
                src={slide.src}
                alt={slide.alt}
                className="story-image absolute inset-0 size-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-b from-black/65 via-transparent to-black/90" />

              <div className="absolute inset-x-0 top-0 z-20 px-4 pt-4 sm:pt-5">
                <div className="flex gap-1.5">
                  {historia.slides.map((item, index) => (
                    <span
                      key={item.id}
                      className="h-0.5 flex-1 overflow-hidden bg-white/35"
                    >
                      <span
                        className={`block h-full bg-white ${
                          index < slideActivo ? "w-full" : "w-0"
                        } ${index === slideActivo ? "story-progress" : ""}`}
                        style={
                          index === slideActivo
                            ? {
                                "--story-duration": `${STORY_DURATION}ms`,
                                animationPlayState: pausada
                                  ? "paused"
                                  : "running",
                              }
                            : undefined
                        }
                      />
                    </span>
                  ))}
                </div>
                <div className="pt-11 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center border border-ag-gold bg-black/40 font-display text-sm text-ag-gold">
                      AG
                    </span>
                    <span className="text-sm font-medium text-white">
                      AnaGlor Studio
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPausada((actual) => !actual)}
                    className="grid size-11 place-items-center text-sm text-white"
                    aria-label={
                      pausada ? "Reanudar historia" : "Pausar historia"
                    }
                  >
                    <FontAwesomeIcon icon={pausada ? faPlay : faPause} />
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={anterior}
                className="absolute inset-y-20 left-0 z-10 w-1/3 cursor-w-resize"
                aria-label="Contenido anterior"
              />
              <button
                type="button"
                onClick={siguiente}
                className="absolute inset-y-20 right-0 z-10 w-2/3 cursor-e-resize"
                aria-label="Contenido siguiente"
              />

              <div className="story-copy absolute inset-x-0 bottom-0 z-10 px-6 pb-10 pt-20 sm:px-8 sm:pb-9">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ag-gold-light">
                  {slide.eyebrow}
                </p>
                <h3 className="mt-3 max-w-sm font-display text-4xl font-light leading-[1.02] text-white">
                  {slide.title}
                </h3>
                <p className="mt-4 max-w-sm text-sm leading-6 text-[#e4e1da]">
                  {slide.body}
                </p>
              </div>
            </article>

            <button
              type="button"
              onClick={siguiente}
              className="absolute right-3 z-20 hidden size-12 place-items-center border border-white/20 bg-black/50 text-white transition-colors hover:border-ag-gold hover:text-ag-gold sm:grid lg:right-8"
              aria-label="Historia siguiente"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>,
          document.body,
        )}
    </>
  );
};

export default Historias;
