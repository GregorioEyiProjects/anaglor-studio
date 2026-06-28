// src/components/Disciplinas/Disciplinas.jsx

import React from "react";
import DisplayTextContainer from "../DisplayText";
import GlobalStyles from "../../styles/global";
import LIST_OF_COURSES from "./list_of_courses";

//Hook
import useDisciplinas from "../../hooks/useDisciplinas";

import AnimatedSpin from "../Global/AnimatedSpin";
import ErrorComponent from "../Global/ErrorComponent";

const ESTILOS_TAG = {
  container: GlobalStyles.container,
  grid: "mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
  card: "flex flex-col bg-ag-card border border-ag-border rounded-sm p-6 transition hover:border-ag-gold hover:shadow-lg",
  icon: "mb-6 text-6xl leading-none",
  title: "font-display text-2xl font-semibold text-white mb-4",
  description: "text-sm leading-6 text-ag-muted mb-5",
  divider: "mb-5 h-px bg-ag-border",
  priceRow: "flex justify-between text-sm text-[#9a968f]",
  priceLabel: "text-[#8f8a80]",
  priceValue: "font-semibold text-ag-gold",
};

const Disciplinas = () => {
  const { disciplinas, loading, error } = useDisciplinas();

  if (loading) {
    return <AnimatedSpin />;
  }

  if (error) {
    return <ErrorComponent message={error.message} />;
  }
  return (
    <section id="disciplinas" className={ESTILOS_TAG.container}>
      <DisplayTextContainer
        spanText="Sobre la oferta"
        h2Text="Nuestras"
        emText="disciplinas"
      />

      <div className={ESTILOS_TAG.grid}>
        {disciplinas.map((course) => (
          <div className={ESTILOS_TAG.card} key={course.id}>
            <div className={ESTILOS_TAG.icon}>{course.icono}</div>
            <h3 className={ESTILOS_TAG.title}>{course.nombre}</h3>
            <p className={ESTILOS_TAG.description}>{course.descripcion}</p>
            <div className={ESTILOS_TAG.divider} />
            <div className="space-y-2">
              {course.tarifas.map((classOption, index) => (
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
