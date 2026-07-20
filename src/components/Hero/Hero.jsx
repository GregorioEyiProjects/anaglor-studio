// src/components/Hero/Hero.jsx
import React from "react";
import ButtonComponent from "../Global/ButtonComponnent";
import STUDIO_CONFIG from "../../config/studio";
import GLOBAL_STYLES from "../../styles/global";
import VideoComponent from "./HeroVideo";

const whatsappLink = `https://wa.me/${STUDIO_CONFIG.whatsapp}?text=Hola,%20me%20gustaría%20información%20sobre%20las%20clases`;

const ESTILOS_TAG = {
  old_container: `flex flex-col min-h-screen text-white justify-center items-center text-black  ${GLOBAL_STYLES.horizontalMargin}`,
  container: `relative overflow-hidden flex flex-col min-h-screen text-white justify-center items-center text-black  ${GLOBAL_STYLES.horizontalMargin}`,
  titleContainer: "flex flex-col items-center mb-4",
  title1: "text-6xl lg:text-8xl text-ag-muted font-display font-light",
  title2:
    "text-3xl lg:text-5xl italic mt-2 text-ag-muted font-display font-light",
  text: "text-xl text-ag-gold font-bold font-body tracking-[0.1em] md:tracking-[0.3em]",
  label: `text-lg text-ag-gold-light mt-2 items-center font-body font-light tracking-[0.1em] lg:tracking-[0.9em] mb-4`,
  btnContainer:
    "flex flex-col justify-center space-y-4 p-2 md:flex-row md:space-y-0  md:space-x-4 ",
};

const Hero = () => {
  return (
    <div className={ESTILOS_TAG.container}>
      
      {/* Capoa 1 */}
      <VideoComponent url={STUDIO_CONFIG.heroVideoUrlModified} />

      {/* Capa 2 */}
      <div className="absolute inset-0 bg-black/40"/>

      {/* Capa 3 */}
      <div className="relative z-10 flex flex-col items-center">
        <span className={ESTILOS_TAG.text}>Madrid · Av. Bruselas 8</span>
        <div className={ESTILOS_TAG.titleContainer}>
          <h1 className={ESTILOS_TAG.title1}>AnaGlor</h1>
          <h2 className={ESTILOS_TAG.title2}>Studio</h2>
        </div>

        <p className={ESTILOS_TAG.label}>
          PILATES <span className="font-bold ">·</span> BARRE <span>·</span> ART
          MOTION
        </p>

        <div className={ESTILOS_TAG.btnContainer}>
          <ButtonComponent text="Reservar clase" href={whatsappLink} />
          <ButtonComponent text="Ver disciplinas" href="#disciplinas" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
