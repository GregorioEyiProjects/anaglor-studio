// src/components/Eventos/Events.jsx
import React from "react";
import DisplayTextContainer from "../DisplayText";
import EVENTS_DATA from "./eventsData";
import ButtonComponent from "../Global/ButtonComponnent";
import GlobalStyles from "../../styles/global";

//hook
import useEventos from "../../hooks/useEventos";

import AnimatedSpin from "../Global/AnimatedSpin";
import ErrorComponent from "../Global/ErrorComponent";

const ESTILOS_TAG = {
  container: GlobalStyles.container,
  banner: "h-55  flex items-center justify-center border-b border-ag-border",
  bannerText: "font-display italic text-2xl text-ag-gold-light",
  grid: "grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[1fr_1fr] lg:gap-10",
  card: "bg-ag-card border border-ag-border relative overflow-hidden grid md:grid-cols-[minmax(240px,340px)_1fr]",
  media:
    "relative flex items-center justify-center border-b border-ag-border bg-black/20  md:border-b-0 md:border-r md:min-h-[520px]",
  poster: "h-auto max-h-[560px] w-full max-w-[300px] object-contain shadow-2xl",
  fallbackBanner:
    "min-h-[260px] flex items-center justify-center border-b border-ag-border md:border-b-0 md:border-r",
  fecha: "text-ag-gold text-xs tracking-widest uppercase",
  badge:
    "absolute top-4 right-4 rounded-md bg-ag-gold px-2 py-1 text-xs font-semibold font-body uppercase tracking-[0.2em] text-black",
  bodyContainer: "p-8 flex flex-col gap-4",
  bodyTitle: "font-body text-xl font-semibold text-white ",
  bodyDescription:
    "font-body text-sm text-ag-muted leading-relaxed line-clamp-3",
  cardPlaceholder:
    "flex items-center justify-center border border-dashed border-ag-border h-full flex-col gap-3",
  addIcon: "text-4xl text-ag-border text-center",
  proximamenteText:
    "text-ag-muted text-center text-sm uppercase tracking-[0.2em]",
  proximamenteSubText: "text-ag-muted text-center text-sm tracking-[0.2em]",
};

const Events = () => {
  const { eventos, loading, error } = useEventos();

  if (loading) {
    return <AnimatedSpin />;
  }

  if (error) {
    return <ErrorComponent message={error} />;
  }

  return (
    <div id="eventos" className={ESTILOS_TAG.container}>
      <DisplayTextContainer
        spanText="Próximamente"
        h2Text="Eventos"
        emText="especiales"
      />

      <div className={ESTILOS_TAG.grid}>
        {eventos
          .filter((event) => event.proximamente)
          .map((event) => {
            //console.log("Event image URL:", event.image_url); // Log the image URL for debugging

            const mensaje = `Hola, me gustaría obtener más información sobre el evento ${event.titulo}.`;

            return (
              <div key={event.id} className={ESTILOS_TAG.card}>
                <div
                  className={
                    event.image_url
                      ? ESTILOS_TAG.media
                      : `banner-gradient ${ESTILOS_TAG.fallbackBanner}`
                  }
                >
                  {event.image_url ? (
                    <img
                      src={event.image_url}
                      alt={`Cartel de ${event.titulo}`}
                      className={ESTILOS_TAG.poster}
                    />
                  ) : (
                    <span className={ESTILOS_TAG.bannerText}>
                      {event.titulo}
                    </span>
                  )}

                  <span className={ESTILOS_TAG.badge}>
                    {event.plazas_limitadas
                      ? "Plazas limitadas"
                      : "Plazas abiertas"}
                  </span>
                </div>

                <div className="flex flex-col justify-between">
                  <div className={ESTILOS_TAG.bodyContainer}>
                    <p className={ESTILOS_TAG.fecha}>{event.fecha}</p>
                    <h3 className={ESTILOS_TAG.bodyTitle}>{event.titulo}</h3>
                    <p className={ESTILOS_TAG.bodyDescription}>
                      {event.descripcion}
                    </p>
                  </div>

                  <div className="flex justify-center items-center p-8">
                    <ButtonComponent
                      text="Más información"
                      onClick={() => {
                        window.open(
                          `https://wa.me/34654643717?text=${encodeURIComponent(mensaje)}`,
                          "_blank",
                        );
                        /* window.open(event.link, "_blank") */
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Events;
