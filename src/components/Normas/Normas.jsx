import React from "react";
import DisplayTextContainer from "../DisplayText";
import GlobalStyles from "../../styles/global";
import RULES_DATA from "./normasData";

const ESTILOS_TAG = {
  grid: "grid grid-cols-1 md:grid-cols-2 items-stretch gap-1",
  gridItem:
    "grid grid-cols-1 border-[2px] border-ag-card items-stretch overflow-hidden rounded-lg p-6 md:grid-cols-[0.1fr_0.9fr]",
  ruleText: "text-base font-semibold font-body text-white",
  description: "text-ag-muted font-body text-base",
};

const Normas = () => {
  return (
    <div className={`${GlobalStyles.container} py-8`}>
      <DisplayTextContainer
        spanText="Información importante"
        h2Text="Normas del"
        emText="centro"
      />
      <div className={ESTILOS_TAG.grid}>
        {RULES_DATA.map((rule) => (
          <div key={rule.id} className={ESTILOS_TAG.gridItem}>
            <span className="font-display text-4xl text-ag-gold opacity-50">
              {String(rule.id).padStart(2, "0")}
            </span>
            <div>
              <p className={ESTILOS_TAG.ruleText}>{rule.firstText}</p>
              <p className={ESTILOS_TAG.description}>{rule.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Normas;
