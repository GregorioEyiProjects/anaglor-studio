import { useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCalendarDay,
  faClock,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import GlobalStyles from "../../styles/global";
import DisplayTextContainer from "../DisplayText";
import useHorarios from "../../hooks/useHorarios";
import AnimatedSpin from "../Global/AnimatedSpin";
import ErrorComponent from "../Global/ErrorComponent";
import descargarHorario from "../../utils/descargarHorario";
import STUDIO_CONFIG from "../../config/studio";

const DIAS_SEMANA = [
  { id: "lunes", corto: "Lun", nombre: "Lunes" },
  { id: "martes", corto: "Mar", nombre: "Martes" },
  { id: "miercoles", corto: "Mié", nombre: "Miércoles" },
  { id: "jueves", corto: "Jue", nombre: "Jueves" },
  { id: "viernes", corto: "Vie", nombre: "Viernes" },
];

const FRANJAS = [
  { id: "todas", label: "Todo el día" },
  { id: "manana", label: "Mañana" },
  { id: "tarde", label: "Tarde" },
];

const ESTILOS_CLASE = {
  maquina: "border-[#745f36] bg-[#2c2519] text-[#e5c781]",
  aereo: "border-[#355075] bg-[#152133] text-[#a9c9ff]",
  funcional: "border-[#2c6444] bg-[#122c1f] text-[#91d5a4]",
  barre: "border-[#72405c] bg-[#301a28] text-[#efa8cc]",
  recuperacion: "border-[#713737] bg-[#301515] text-[#ff9c9c]",
  semiprivada: "border-[#4d4d76] bg-[#222235] text-[#b9b9ff]",
  default: "border-[#454545] bg-[#242424] text-[#dedbd4]",
};

const diaInicial = () => {
  const indice = new Date().getDay() - 1;
  return DIAS_SEMANA[indice]?.id ?? "lunes";
};

const coincideFranja = (hora, franja) => {
  if (franja === "todas") return true;
  const inicio = Number.parseInt(hora.slice(0, 2), 10);
  return franja === "manana" ? inicio < 14 : inicio >= 17;
};

const enlaceDisponibilidad = (dia, hora, clase) => {
  const nombreDia = DIAS_SEMANA.find((item) => item.id === dia)?.nombre ?? dia;
  const mensaje = `Hola, me gustaría consultar si hay plaza para ${clase.nombre}, el ${nombreDia} de ${hora}.`;
  return `https://wa.me/${STUDIO_CONFIG.whatsapp}?text=${encodeURIComponent(mensaje)}`;
};

const Schedules = () => {
  const { horarios, loading, error } = useHorarios();
  const tablaContentRef = useRef(null);
  const [diaSeleccionado, setDiaSeleccionado] = useState(diaInicial);
  const [tipoSeleccionado, setTipoSeleccionado] = useState("todas");
  const [franjaSeleccionada, setFranjaSeleccionada] = useState("todas");

  const horariosAgrupados = useMemo(() => {
    const agrupados = horarios.reduce((acc, clase) => {
      const fila = acc.get(clase.hora) ?? {
        hora: clase.hora,
        dias: Object.fromEntries(DIAS_SEMANA.map((dia) => [dia.id, []])),
      };

      if (fila.dias[clase.dia]) fila.dias[clase.dia].push(clase);
      acc.set(clase.hora, fila);
      return acc;
    }, new Map());

    return [...agrupados.values()].sort((a, b) =>
      a.hora.localeCompare(b.hora),
    );
  }, [horarios]);

  const disciplinas = useMemo(() => {
    const opciones = new Map();
    horarios
      .filter((clase) => clase.visible)
      .forEach((clase) => {
        if (!opciones.has(clase.tipo)) opciones.set(clase.tipo, clase.nombre);
      });
    return [...opciones.entries()].map(([tipo, nombre]) => ({ tipo, nombre }));
  }, [horarios]);

  const filasFiltradas = useMemo(
    () =>
      horariosAgrupados
        .map((fila) => ({
          ...fila,
          dias: Object.fromEntries(
            DIAS_SEMANA.map((dia) => [
              dia.id,
              fila.dias[dia.id].filter(
                (clase) =>
                  clase.visible &&
                  (tipoSeleccionado === "todas" ||
                    clase.tipo === tipoSeleccionado) &&
                  coincideFranja(fila.hora, franjaSeleccionada),
              ),
            ]),
          ),
        }))
        .filter((fila) =>
          DIAS_SEMANA.some((dia) => fila.dias[dia.id].length > 0),
        ),
    [franjaSeleccionada, horariosAgrupados, tipoSeleccionado],
  );

  const clasesDiaSeleccionado = filasFiltradas.flatMap((fila) =>
    fila.dias[diaSeleccionado].map((clase) => ({
      ...clase,
      hora: fila.hora,
    })),
  );

  if (loading) {
    return (
      <section id="horarios" className={`${GlobalStyles.container} py-12`}>
        <AnimatedSpin />
      </section>
    );
  }
  if (error) {
    return (
      <section id="horarios" className={`${GlobalStyles.container} py-12`}>
        <ErrorComponent message={error} />
      </section>
    );
  }

  return (
    <section
      id="horarios"
      className={`${GlobalStyles.container} py-12 lg:py-16`}
    >
      <div
        className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end"
        data-reveal
      >
        <DisplayTextContainer
          spanText="Semana habitual"
          h2Text="Encuentra tu"
          emText="clase"
        />
        <div className="mb-4 max-w-md lg:text-right">
          <p className="text-sm leading-6 text-ag-muted">
            Horario orientativo. Las plazas se confirman personalmente por
            WhatsApp.
          </p>
          <p className="mt-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-ag-gold">
            <FontAwesomeIcon icon={faWhatsapp} />
            Respuesta directa del estudio
          </p>
        </div>
      </div>

      <div className="liquid-glass-soft mt-7 grid gap-5 rounded-lg p-5 md:grid-cols-[minmax(180px,0.65fr)_minmax(320px,1fr)_auto] md:items-end">
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-[#b7b3aa]">
            Filtrar por disciplina
          </span>
          <select
            value={tipoSeleccionado}
            onChange={(event) => setTipoSeleccionado(event.target.value)}
            className="liquid-glass-field h-11 w-full rounded px-3 text-sm text-white outline-none transition-colors focus:border-ag-gold"
          >
            <option value="todas">Todas las clases</option>
            {disciplinas.map((disciplina) => (
              <option key={disciplina.tipo} value={disciplina.tipo}>
                {disciplina.nombre}
              </option>
            ))}
          </select>
        </label>

        <div>
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-[#b7b3aa]">
            Franja horaria
          </span>
          <div
            className="liquid-glass-control grid h-11 grid-cols-3 rounded overflow-hidden"
            role="group"
            aria-label="Franja horaria"
          >
            {FRANJAS.map((franja) => {
              const activa = franjaSeleccionada === franja.id;
              return (
                <button
                  key={franja.id}
                  type="button"
                  aria-pressed={activa}
                  onClick={() => setFranjaSeleccionada(franja.id)}
                  className={`border-r border-ag-border px-2 text-xs transition-colors last:border-r-0 ${
                    activa
                      ? "bg-ag-gold font-semibold text-black"
                      : "bg-transparent text-[#c7c3ba] hover:text-white"
                  }`}
                >
                  {franja.label}
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={() => descargarHorario(tablaContentRef)}
          className="liquid-glass-control hidden size-11 place-items-center rounded text-ag-muted transition-colors hover:border-ag-gold hover:text-ag-gold lg:grid"
          title="Descargar horario"
          aria-label="Descargar horario"
        >
          <FontAwesomeIcon icon={faDownload} />
        </button>
      </div>

      <div className="mt-6 lg:hidden">
        <div className="liquid-glass-control grid grid-cols-5 overflow-hidden rounded">
          {DIAS_SEMANA.map((dia) => {
            const activo = diaSeleccionado === dia.id;
            return (
              <button
                key={dia.id}
                type="button"
                aria-pressed={activo}
                onClick={() => setDiaSeleccionado(dia.id)}
                className={`h-12 min-w-0 border-r border-ag-border text-xs uppercase transition-colors last:border-r-0 ${
                  activo
                    ? "bg-ag-gold font-semibold text-black"
                    : "bg-transparent text-[#c7c3ba]"
                }`}
              >
                {dia.corto}
              </button>
            );
          })}
        </div>

        <div className="mt-3 divide-y divide-ag-border border-y border-ag-border">
          {clasesDiaSeleccionado.length > 0 ? (
            clasesDiaSeleccionado.map((clase, index) => (
              <article
                key={`${clase.hora}-${clase.nombre}-${index}`}
                className="grid grid-cols-[4.75rem_1fr] gap-4 py-5"
              >
                <div className="flex items-start gap-2 text-sm text-[#c7c3ba]">
                  <FontAwesomeIcon
                    icon={faClock}
                    className="mt-1 text-xs text-ag-gold"
                  />
                  <span className="leading-5">{clase.hora.split("–")[0]}</span>
                </div>
                <div className="min-w-0">
                  <span
                    className={`inline-block border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                      ESTILOS_CLASE[clase.tipo] ?? ESTILOS_CLASE.default
                    }`}
                  >
                    {clase.nombre}
                  </span>
                  <a
                    href={enlaceDisponibilidad(
                      diaSeleccionado,
                      clase.hora,
                      clase,
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="liquid-glass-control mt-3 flex min-h-11 w-full items-center justify-between rounded px-3 text-sm text-white transition-colors hover:border-ag-gold hover:text-ag-gold"
                  >
                    Consultar disponibilidad
                    <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                  </a>
                </div>
              </article>
            ))
          ) : (
            <div className="py-12 text-center">
              <FontAwesomeIcon
                icon={faCalendarDay}
                className="mb-3 text-2xl text-ag-gold"
              />
              <p className="text-sm text-ag-muted">
                No hay clases con estos filtros.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 hidden overflow-x-auto border border-ag-border bg-ag-dark lg:block">
        <table
          ref={tablaContentRef}
          className="min-w-[1100px] table-fixed border-collapse"
        >
          <thead>
            <tr className="bg-ag-card">
              <th className="w-32 border-b border-r border-ag-border px-4 py-4 text-left text-xs font-medium uppercase tracking-[0.16em] text-ag-muted">
                Hora
              </th>
              {DIAS_SEMANA.map((dia) => (
                <th
                  key={dia.id}
                  className="border-b border-r border-ag-border px-3 py-4 text-center text-xs font-medium uppercase tracking-[0.16em] text-[#c7c3ba] last:border-r-0"
                >
                  {dia.nombre}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filasFiltradas.length > 0 ? (
              filasFiltradas.map((fila) => (
                <tr key={fila.hora} className="even:bg-white/[0.015]">
                  <td className="border-b border-r border-ag-border px-4 py-4 align-top font-display text-lg text-[#c7c3ba]">
                    {fila.hora}
                  </td>
                  {DIAS_SEMANA.map((dia) => (
                    <td
                      key={dia.id}
                      className="border-b border-r border-ag-border p-2 align-top last:border-r-0"
                    >
                      {fila.dias[dia.id].length > 0 ? (
                        <div className="space-y-2">
                          {fila.dias[dia.id].map((clase, index) => (
                            <a
                              key={`${clase.nombre}-${index}`}
                              href={enlaceDisponibilidad(
                                dia.id,
                                fila.hora,
                                clase,
                              )}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={`Consultar disponibilidad para ${clase.nombre}, ${dia.nombre} de ${fila.hora}`}
                              className={`group block min-h-20 border p-3 transition-transform hover:-translate-y-0.5 ${
                                ESTILOS_CLASE[clase.tipo] ??
                                ESTILOS_CLASE.default
                              }`}
                            >
                              <strong className="block text-xs font-semibold uppercase tracking-[0.1em]">
                                {clase.nombre}
                              </strong>
                              <span className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-[0.1em] opacity-80">
                                Consultar plaza
                                <FontAwesomeIcon icon={faArrowRight} />
                              </span>
                            </a>
                          ))}
                        </div>
                      ) : (
                        <span className="block py-7 text-center text-[#353535]">
                          —
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-14 text-center text-ag-muted">
                  No hay clases con estos filtros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex flex-col gap-5 border-y border-ag-border py-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-display text-2xl font-light text-white">
            ¿Necesitas otro horario?
          </h3>
          <p className="mt-1 text-sm text-ag-muted">
            Cuéntanos tu disponibilidad y buscamos el grupo que mejor encaje.
          </p>
        </div>
        <a
          href={`https://wa.me/${STUDIO_CONFIG.whatsapp}?text=${encodeURIComponent(
            "Hola, no encuentro el horario que necesito. Me gustaría consultar otras opciones.",
          )}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 bg-ag-gold px-5 text-sm font-semibold uppercase tracking-[0.12em] text-black transition-colors hover:bg-ag-gold-light"
        >
          <FontAwesomeIcon icon={faWhatsapp} />
          Consultar opciones
        </a>
      </div>
    </section>
  );
};

export default Schedules;
