// src/components/navBar/NavBar.jsx

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBars,
  faCalendarDays,
  faDumbbell,
  faEnvelope,
  faHouse,
  faLocationDot,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import NAV_LIST from "./navList";
import STUDIO_CONFIG from "../../config/studio";

const whatsappLink = `https://wa.me/${STUDIO_CONFIG.whatsapp}?text=${encodeURIComponent(
  "Hola, me gustaría consultar las plazas disponibles para una clase.",
)}`;

const NAV_ICONS = {
  "#sobre": faHouse,
  "#disciplinas": faDumbbell,
  "#horarios": faCalendarDays,
  "#contacto": faEnvelope,
};

const NavBar = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [seccionActiva, setSeccionActiva] = useState("");
  const [conFondo, setConFondo] = useState(false);

  useEffect(() => {
    const actualizarFondo = () => setConFondo(window.scrollY > 32);
    actualizarFondo();
    window.addEventListener("scroll", actualizarFondo, { passive: true });
    return () => window.removeEventListener("scroll", actualizarFondo);
  }, []);

  useEffect(() => {
    let frame;

    const actualizarSeccion = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const puntoLectura = window.scrollY + 112;
        const disponibles = NAV_LIST.map((item) => ({
          item,
          section: document.querySelector(item.href),
        })).filter(({ section }) => section);

        const actual = disponibles.reduce((seleccionada, candidata) => {
          if (candidata.section.offsetTop <= puntoLectura) return candidata;
          return seleccionada;
        }, disponibles[0]);

        setSeccionActiva(actual?.item.href ?? "");
        frame = undefined;
      });
    };

    actualizarSeccion();
    window.addEventListener("scroll", actualizarSeccion, { passive: true });
    const observer = new MutationObserver(actualizarSeccion);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("scroll", actualizarSeccion);
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setMenuAbierto(false);
    };

    document.body.style.overflow = menuAbierto ? "hidden" : "";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuAbierto]);

  const cerrarMenu = () => setMenuAbierto(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-3 pt-3 text-white sm:px-5 lg:px-8">
      <div
        className={`liquid-glass liquid-glass-nav mx-auto flex h-16 max-w-360 items-center justify-between overflow-hidden rounded-lg px-4 transition-colors duration-500 sm:px-5 lg:px-6 ${
          conFondo || menuAbierto ? "is-solid" : ""
        }`}
      >
        <a
          href="#top"
          className="group flex items-center gap-3"
          onClick={cerrarMenu}
          aria-label="AnaGlor Studio, volver al inicio"
        >
          <span className="grid size-10 place-items-center border border-ag-gold font-display text-xl text-ag-gold transition-colors group-hover:bg-ag-gold group-hover:text-black">
            AG
          </span>
          <span className="leading-none">
            <strong className="block font-display text-xl font-light">
              AnaGlor
            </strong>
            <span className="mt-1 block text-[10px] uppercase tracking-[0.28em] text-ag-muted">
              Pilates · Movimiento
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          <ul className="flex items-center gap-7">
            {NAV_LIST.map((item) => {
              const activa = seccionActiva === item.href;
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    aria-current={activa ? "page" : undefined}
                    className={`border-b py-2 text-xs font-medium uppercase tracking-[0.16em] transition-colors ${
                      activa
                        ? "border-ag-gold text-ag-gold"
                        : "border-transparent text-[#d4d1ca] hover:text-white"
                    }`}
                  >
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center gap-2 border border-ag-gold bg-ag-gold px-4 text-xs font-semibold uppercase tracking-[0.14em] text-black transition-colors hover:bg-ag-gold-light"
          >
            <FontAwesomeIcon icon={faWhatsapp} />
            Consultar plaza
          </a>
        </div>

        <button
          className="liquid-glass-control grid size-11 place-items-center rounded-full text-xl transition-colors hover:border-ag-gold hover:text-ag-gold lg:hidden"
          onClick={() => setMenuAbierto((abierto) => !abierto)}
          aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuAbierto}
          aria-controls="mobile-menu"
        >
          <FontAwesomeIcon icon={menuAbierto ? faXmark : faBars} />
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`liquid-glass fixed inset-x-3 top-[5.25rem] max-h-[calc(100svh-6rem)] overflow-y-auto rounded-lg px-5 py-7 transition-[opacity,translate,scale,visibility] duration-300 ease-out sm:inset-x-5 lg:hidden ${
          menuAbierto
            ? "visible translate-y-0 scale-100 opacity-100"
            : "pointer-events-none invisible -translate-y-2 scale-[0.985] opacity-0"
        }`}
        aria-hidden={!menuAbierto}
        inert={!menuAbierto}
        data-lenis-prevent
      >
        <ul className="divide-y divide-white/10">
          {NAV_LIST.map((item) => {
            const activa = seccionActiva === item.href;
            return (
              <li key={item.id}>
                <a
                  href={item.href}
                  aria-current={activa ? "page" : undefined}
                  className={`flex min-h-16 items-center justify-between py-3 font-display text-2xl font-light transition-colors hover:text-ag-gold ${
                    activa ? "text-ag-gold" : "text-white"
                  }`}
                  onClick={cerrarMenu}
                >
                  <span className="flex items-center">
                    <span className="mr-4 grid size-6 place-items-center text-base text-ag-gold">
                      <FontAwesomeIcon
                        icon={NAV_ICONS[item.href]}
                        aria-hidden="true"
                      />
                    </span>
                    {item.title}
                  </span>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className={`text-sm ${
                      activa ? "text-ag-gold" : "text-ag-muted"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 border-t border-white/10 pt-6">
          <p className="mb-5 flex items-start gap-3 text-sm leading-6 text-ag-muted">
            <FontAwesomeIcon
              icon={faLocationDot}
              className="mt-1 text-ag-gold"
            />
            {STUDIO_CONFIG.direccion}
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="flex h-13 w-full items-center justify-center gap-3 bg-ag-gold px-5 text-sm font-semibold uppercase tracking-[0.14em] text-black"
            onClick={cerrarMenu}
          >
            <FontAwesomeIcon icon={faWhatsapp} className="text-lg" />
            Consultar una plaza
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

/* 

<div className={ESTILOS_TAG.mainRow}>
        <h1
          className={ESTILOS_TAG.title}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          AG Studio
        </h1>

        <ul className={ESTILOS_TAG.navList}>
          {NAV_LIST.map((item) => (
            <li key={item.id} className={ESTILOS_TAG.navItem}>
              <a href={item.href} className={ESTILOS_TAG.navLink}>
                {item.title}
              </a>
            </li>
          ))}
        </ul>

        <button className="flex lg:hidden text-white" onClick={toggleMenu}>
          {menuAbierto ? (
            <span className="text-2xl">x</span>
          ) : (
            <span className="text-2xl">☰</span>
          )}
        </button>
      </div>

      <ul
        className={`${ESTILOS_TAG.dropdownMenu} ${menuAbierto ? "max-h-60 gap-4" : "max-h-0"}`}
      >
        {NAV_LIST.map((item) => (
          <li key={item.id} className={ESTILOS_TAG.navItem}>
            <a href={item.href} className={ESTILOS_TAG.navLink}>
              {item.title}
            </a>
          </li>
        ))}
      </ul>
      
*/
