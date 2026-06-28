// src/components/Horarios/Schedules.jsx

import React, { useRef } from "react";
import GlobalStyles from "../../styles/global";
import DisplayTextContainer from "../DisplayText";
import HORARIOS_DATA from "./horarios";

//Hooks
import useHorarios from "../../hooks/useHorarios";
import AnimatedSpin from "../Global/AnimatedSpin";
import ErrorComponent from "../Global/ErrorComponent";

import descargarHorario from "../../utils/descargarHorario";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const DIAS_SEMANA = ["lunes", "martes", "miercoles", "jueves", "viernes"];

const ESTILOS_TAG = {
  container: GlobalStyles.container,
  maquina: "bg-[#3a3023] text-[#d8b66d] border border-[#4b3e2a]",
  aereo: "bg-[#172436] text-[#9ec2ff] border border-[#22334b]",
  funcional: "bg-[#143122] text-[#79c98f] border border-[#1e4430]",
  barre: "bg-[#341c2c] text-[#e08ab7] border border-[#4a2740]",
  recuperacion: "bg-[#3a1414] text-[#ff8080] border border-[#5a2020]",
  semiprivada: "bg-[#2a2a3a] text-[#aaaaff] border border-[#3a3a5a]",
  tabla:
    "overflow-x-auto overflow-hidden rounded-sm border border-ag-border bg-ag-dark shadow-[0_0_0_1px_rgba(255,255,255,0.02)]",
  th: "border-b font-display font-light border-r border-ag-border px-4 py-5 text-left text-sm tracking-[0.3em]",
  td: "border-r font-body font-light  border-b border-ag-border px-3 py-3 align-middle",
  claseVacia: "block py-8 text-center text-[#2b2b2b]",
  contenedorClases: "flex flex-col items-center gap-2",
  clase:
    "inline-flex min-w-32 justify-center rounded-[3px] px-4 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em]",
  tHeadHora:
    "w-44 border-b font-body font-light border-r border-ag-border px-4 py-5 text-left text-sm font-medium tracking-[0.3em]",
  tHeadDia:
    "border-b font-body font-light border-r border-ag-border px-4 py-5 text-center text-sm font-medium uppercase tracking-[0.3em] last:border-r-0",
  tdHora:
    "border-r font-body font-light border-b border-ag-border px-2 py-1 text-left text-lg tracking-widget text-ag-muted",
  consultarDisponibilidadContainer:
    "flex justify-center items-center mt-1 w-full",
  downloadButton:
    "border border-ag-border p-2 text-ag-muted hover:border-ag-gold hover:text-ag-gold transition-colors rounded-sm",
};

const Schedules = () => {
  const { horarios, loading, error } = useHorarios();

  const tablaContentRef = useRef(null);

  const horariosAgrupados = horarios.reduce((acc, clase) => {
    const filaExistente = acc.find((fila) => fila.hora === clase.hora);

    if (filaExistente) {
      if (!filaExistente.dias[clase.dia]) {
        filaExistente.dias[clase.dia] = [];
      }

      filaExistente.dias[clase.dia].push(clase);
    } else {
      // // Inicializar TODOS los días vacíos desde el principio

      acc.push({
        hora: clase.hora,
        dias: {
          lunes: [],
          martes: [],
          miercoles: [],
          jueves: [],
          viernes: [],
          sabado: [],
          [clase.dia]: [clase], // sobreescribe el día correcto
        },
      });
    }

    return acc;
  }, []);

  if (loading) {
    return <AnimatedSpin />;
  }

  if (error) {
    return <ErrorComponent message={error} />;
  }

  return (
    <section id="horarios" className={`${ESTILOS_TAG.container} py-8`}>
      <DisplayTextContainer
        spanText="Semana actual"
        h2Text="Horario de"
        emText="clases"
      />

      <div className="flex justify-end items-center mb-2">
        <button
          onClick={() => descargarHorario(tablaContentRef)}
          className={ESTILOS_TAG.downloadButton}
          title="Descargar horario"
        >
          <FontAwesomeIcon icon={faDownload} />
        </button>
      </div>

      <div className={ESTILOS_TAG.tabla}>
        <table
          ref={tablaContentRef}
          className="min-w-full border-collapse table-fixed"
        >
          <thead className="">
            <tr>
              <th className={ESTILOS_TAG.tHeadHora}>HORA</th>
              {DIAS_SEMANA.map((dia) => (
                <th key={dia} className={ESTILOS_TAG.tHeadDia}>
                  {dia}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {horariosAgrupados.map((fila, index) => {
              const tieneClases = DIAS_SEMANA.some((dia) =>
                (fila.dias[dia] ?? []).some((clase) => clase.visible),
              );

              if (!tieneClases) return null;

              return (
                <tr key={index} className="bg-ag-dark even:bg-ag-dark/50">
                  <td className={ESTILOS_TAG.tdHora}>{fila.hora}</td>
                  {DIAS_SEMANA.map((dia) => {
                    const clasesEnDia = fila.dias[dia] ?? [];
                    return (
                      <td key={dia} className={ESTILOS_TAG.td}>
                        {clasesEnDia.length === 0 ? (
                          <span className={ESTILOS_TAG.claseVacia}>—</span>
                        ) : (
                          <div className={ESTILOS_TAG.contenedorClases}>
                            {clasesEnDia
                              .filter((clase) => clase.visible)
                              .map((clase, idx) => (
                                <span
                                  key={idx + clase.nombre}
                                  className={` ${ESTILOS_TAG.clase} ${ESTILOS_TAG[clase.tipo] ?? "bg-[#2b2b2b] text-[#d6d6d6] border border-[#3a3a3a]"}`}
                                >
                                  {clase.nombre}
                                </span>
                              ))}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );

              /*   */
            })}
          </tbody>
        </table>
      </div>

      <div className={ESTILOS_TAG.consultarDisponibilidadContainer}>
        <span className="text-ag-muted text-center text-sm font-light tracking-[0.18em] lg:tracking-[0.25em] ">
          Horario resumido · Consulta disponibilidad completa al reservar
        </span>
      </div>
    </section>
  );
};

export default Schedules;
