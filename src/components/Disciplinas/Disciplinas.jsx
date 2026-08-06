// src/components/Disciplinas/Disciplinas.jsx

import React from "react";
import DisplayTextContainer from "../DisplayText";
import GlobalStyles from "../../styles/global";
//import LIST_OF_COURSES from "./list_of_courses";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faBolt,
  faDumbbell,
  faFeatherPointed,
  faPerson,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

//Hook
import useDisciplinas from "../../hooks/useDisciplinas";

import AnimatedSpin from "../Global/AnimatedSpin";
import ErrorComponent from "../Global/ErrorComponent";

const ESTILOS_TAG = {
  container: GlobalStyles.container,
  grid: "mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
  card: "liquid-glass-soft liquid-glass-interactive flex flex-col overflow-hidden rounded-lg p-6",
  icon: "liquid-glass-control mb-7 grid size-12 place-items-center rounded-full text-lg text-ag-gold",
  title: "font-display text-2xl font-semibold text-white mb-4",
  description: "text-sm leading-6 text-ag-muted mb-5",
  divider: "mb-5 h-px bg-ag-border",
  priceRow: "flex justify-between text-sm text-[#9a968f]",
  priceLabel: "text-[#8f8a80]",
  priceValue: "font-semibold text-ag-gold",
};

const iconoDisciplina = (nombre = "") => {
  const normalizado = nombre.toLocaleLowerCase("es");

  if (normalizado.includes("aéreo") || normalizado.includes("aereo")) {
    return faFeatherPointed;
  }
  if (normalizado.includes("barre")) return faPerson;
  if (normalizado.includes("funcional")) return faBolt;
  if (normalizado.includes("privada")) return faUser;
  return faDumbbell;
};

const Disciplinas = () => {
  const { disciplinas, loading, error } = useDisciplinas();

  if (loading) {
    return (
      <section id="disciplinas" className={ESTILOS_TAG.container}>
        <AnimatedSpin />
      </section>
    );
  }

  if (error) {
    return (
      <section id="disciplinas" className={ESTILOS_TAG.container}>
        <ErrorComponent message={error.message} />
      </section>
    );
  }
  return (
    <section id="disciplinas" className={ESTILOS_TAG.container}>
      <DisplayTextContainer
        spanText="Sobre la oferta"
        h2Text="Nuestras"
        emText="disciplinas"
      />

      <div className={ESTILOS_TAG.grid}>
        {disciplinas.map((course, index) => (
          <div
            key={course.id}
            className={ESTILOS_TAG.card}
            data-reveal
            style={{ "--reveal-delay": `${index * 60}ms` }}
          >
            <div className={ESTILOS_TAG.icon} aria-hidden="true">
              <FontAwesomeIcon icon={iconoDisciplina(course.nombre)} />
            </div>

            <h3 className={ESTILOS_TAG.title}>{course.nombre}</h3>
            <p className={ESTILOS_TAG.description}>{course.descripcion}</p>
            <div className={ESTILOS_TAG.divider} />

            <div className="space-y-2">
              {course.tarifas.map((classOption) => (
                <div className={ESTILOS_TAG.priceRow} key={classOption.label}>
                  <span className={ESTILOS_TAG.priceLabel}>
                    {classOption.label}
                  </span>
                  <span className={ESTILOS_TAG.priceValue}>
                    {classOption.precio} €
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Disciplinas;
