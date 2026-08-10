// src/components/Sobre/About.jsx

import React from "react";

import GlobalStyles from "../../styles/global";
import DisplayTextContainer from "../DisplayText";
import ButtonComponent from "../Global/ButtonComponnent";

const STATS = [
  { value: "5", label: "Disciplinas" },
  { value: "1", label: "Instructor" },
  { value: "5", label: "Días a la semana" },
  { value: "0", label: "Matrícula" },
];
/* statsContainer: flex flex-col justify-center */
const ESTILOS_TAG = {
  container: GlobalStyles.container,
  grid: "grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10",
  divider: "my-6 h-px w-20 bg-ag-gold",
  description: "mt-4 max-w-xl text-lg leading-8 text-ag-muted",
  descriptionStrong: "font-semibold text-white",
  statsGrid: "grid grid-cols-2 gap-2",
  statsContainer:
    "flex flex-col justify-center min-h-44 border-[2px] border-ag-card items-center overflow-hidden rounded-lg px-4 py-6 text-center",
  statValue: "font-display text-5xl leading-none text-ag-gold ",
  statLabel:
    "mt-3 font-display max-w-28 text-sm uppercase tracking-[0.35em] text-[#8f8a80]",
};

const Sobre = () => {
  return (
    <section id="sobre" className={`${ESTILOS_TAG.container} py-8`}>
      <DisplayTextContainer
        spanText="Sobre el estudio"
        h2Text="Movimiento"
        emText="consciente"
      />

      <div className={ESTILOS_TAG.grid}>
        <div>
          <div className={ESTILOS_TAG.divider} />

          <p className={ESTILOS_TAG.description}>
            AnaGlor Studio es un espacio especializado en{" "}
            <strong className={ESTILOS_TAG.descriptionStrong}>
              entrenamiento y movimiento consciente
            </strong>
            , enfocado en mejorar la condición física, la postura y el
            equilibrio corporal.
          </p>
          <p className={ESTILOS_TAG.description}>
            Dirigido por{" "}
            <strong className={ESTILOS_TAG.descriptionStrong}>
              Adriana Alves Teodoro
            </strong>
            , con formación en entrenamiento físico, danza clásica y
            contemporánea, y prácticas somáticas.
          </p>

          <div className="mt-4 w-full">
            <ButtonComponent
              text="Hablar con el estudio"
              onClick={() => {
                window.location.href = "#contacto";
              }}
            />
          </div>
        </div>

        <div className={ESTILOS_TAG.statsGrid}>
          {STATS.map((stat, index) => (
            <div key={stat.label} className={ESTILOS_TAG.statsContainer}>
              <div className={ESTILOS_TAG.statValue}>{stat.value}</div>
              <div className={ESTILOS_TAG.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sobre;
