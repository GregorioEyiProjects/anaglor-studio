// src/components/DisplayText.jsx
import React from "react";

const DisplayTextContainer = ({ spanText, h2Text, emText }) => {
  const ESTILOS_TAG = {
    container: "mt-10 bg-ag-dark text-left",
    aboutStudio:
      "mb-4 block text-sm font-semibold uppercase tracking-[0.3em] text-ag-gold",
    movimientoText: "text-4xl font-light text-ag-muted lg:text-5xl",
    conscienteText:
      "mt-1 mb-4 block font-display text-3xl italic text-ag-gold lg:text-4xl",
  };

  return (
    <div className={ESTILOS_TAG.container}>
      <span className={ESTILOS_TAG.aboutStudio}>{spanText}</span>
      <h2 className={ESTILOS_TAG.movimientoText}>{h2Text}</h2>
      <em className={ESTILOS_TAG.conscienteText}>{emText}</em>
    </div>
  );
};

export default DisplayTextContainer;
