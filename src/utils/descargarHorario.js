// src/utils/descargarHorario.js

import html2canvas from "html2canvas";

/* 
#C9A96E — dorado — es tu ag-gold, el color principal de acento
#888880 — gris medio — es tu ag-muted, para texto secundario
#0f0f0f — negro casi puro — fondo de las celdas
#9a968f — gris cálido  */

const descargarHorario = async (tablaContentRef) => {
  //Contenedor temporal
  const wrapper = document.createElement("div");
  wrapper.style.backgroundColor = "#080808";
  wrapper.style.padding = "32px";
  wrapper.style.display = "inline-block";

  // Título
  const titulo = document.createElement("h1");
  titulo.style.color = "#C9A96E";
  titulo.style.fontFamily = "Cormorant Garamond, serif";
  titulo.style.fontSize = "28px";
  titulo.style.fontWeight = "300";
  titulo.style.letterSpacing = "0.1em";
  titulo.style.marginBottom = "8px";
  titulo.style.textAlign = "center";
  titulo.innerText = "AnaGlor Studio";

  // Subtítulo
  const subtitulo = document.createElement("p");
  subtitulo.style.color = "#888880";
  subtitulo.style.fontFamily = "Inter, sans-serif";
  subtitulo.style.fontSize = "11px";
  subtitulo.style.letterSpacing = "0.28em";
  subtitulo.style.marginBottom = "24px";
  subtitulo.style.textAlign = "center";
  subtitulo.innerText = "PILATES · BARRE · ART MOTION";

  //Clonar la tabla para no afectar la original
  const tablaClone = tablaContentRef.current.cloneNode(true);

  wrapper.appendChild(titulo);
  wrapper.appendChild(subtitulo);
  wrapper.appendChild(tablaClone);

  // Establecer estilos para que el contenedor temporal no sea visible y no afecte el layout
  wrapper.style.position = "fixed";
  wrapper.style.top = "-9999px";
  wrapper.style.left = "-9999px";
  wrapper.style.zIndex = "-1";

  // Añade al body temporalmente para que html2canvas pueda capturarlo
  document.body.appendChild(wrapper);

  const canvas = await html2canvas(wrapper, {
    backgroundColor: "#080808", // color de fondo
    scale: 2, // doble resolución para que se vea nítido
    onclone: (clonedDoc) => {
      // Convierte todos los colores oklab a hex en el clon ya que html2canvas
      // no soporta el formato de color oklab que usa Tailwind v4 internamente
      const elements = clonedDoc.querySelectorAll("*");
      elements.forEach((el) => {
        const style = window.getComputedStyle(el);
        const bg = style.backgroundColor;
        const color = style.color;
        const border = style.borderColor;

        if (bg.includes("oklab")) el.style.backgroundColor = "#0f0f0f";
        if (color.includes("oklab")) el.style.color = "#2a2a2a";

        // Conviertir el color del texto si NO es un th (header)
        if (border.includes("oklab") && el.tagName !== "TH") {
          el.style.color = "#9a968f";
        }

        // Los th mantienen su color dorado
        if (el.tagName === "TH") {
          el.style.color = "#e0e0e0";
        }
      });
    },
  });

  // Elimina el contenedor temporal
  document.body.removeChild(wrapper);

  const link = document.createElement("a");
  link.download = "horario-anaglor-studio.png"; // nombre del archivo
  link.href = canvas.toDataURL(); // convierte el canvas en base64 PNG
  link.click(); // simula un click de descarga
};

export default descargarHorario;
