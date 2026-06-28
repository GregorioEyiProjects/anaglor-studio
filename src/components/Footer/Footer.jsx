import React from "react";
import GLOBAL_STYLES from "../../styles/global";

const ESTILOS_TAG = {
  mainContainer: "mt-10 bg-ag-footer border-t border-ag-border",
  container: `${GLOBAL_STYLES.footerContainer} px-4 py-2 gap-4 md:px-8 md:py-8 `,
};

const Footer = () => {
  return (
    <footer className={ESTILOS_TAG.mainContainer}>
      <div className={ESTILOS_TAG.container}>
        <p className=" text-ag-muted font-display text-2xl">AnaGlor·Studio</p>
        <p className="text-ag-muted font-body text-sm">
          Pilates · Barre · Art Motion · Madrid
        </p>
        <p className=" text-ag-muted font-body text-sm">
          © {new Date().getFullYear()} AnaGlor Studio
        </p>
      </div>
    </footer>
  );
};

export default Footer;
