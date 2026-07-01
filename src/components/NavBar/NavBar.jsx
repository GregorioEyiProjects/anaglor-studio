// src/components/navBar/NavBar.jsx

import React, { useState, useEffect } from "react";
import NAV_LIST from "./navList";
import GLOBAL_STYLES from "../../styles/global";

const ESTILOS_TAG = {
  navContainer: "sticky top-0 z-50 bg-ag-dark border-b border-ag-border",
  mainRow: `flex flex-row justify-between items-center py-4 ${GLOBAL_STYLES.horizontalMargin} `,
  title:
    "text-4xl font-display font-light text-white cursor-pointer transition duration-300 ",
  navList: "hidden lg:flex space-x-8",
  navItem: "text-lg font-semibold",
  navLink:
    "text-white font-body font-light border-b-2 border-transparent hover:border-ag-gold transition duration-300",
  dropdownMenu: `flex flex-col lg:hidden border-t border-ag-border 
  px-4 overflow-hidden transition-all duration-300 
  ease-in-out items-end ${GLOBAL_STYLES.horizontalMargin}`,
};

const NavBar = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  // Cerrar el menú al hacer scroll
  useEffect(() => {
    let timeout;
    const handleScroll = () => {
      setMenuAbierto(false);
    };

    if (menuAbierto) {
      timeout = setTimeout(() => {
        window.addEventListener("scroll", handleScroll);
      }, 300); // 300ms de retraso antes de agregar el listener
    } else {
      window.removeEventListener("scroll", handleScroll);
    }

    // Limpieza — elimina el listener cuando el componente se desmonta
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [menuAbierto]);

  return (
    <nav className={ESTILOS_TAG.navContainer}>
      <div className={ESTILOS_TAG.mainRow}>
        <h1
          className={ESTILOS_TAG.title}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          AG Studio
        </h1>

        {/* Links desktop */}
        <ul className={ESTILOS_TAG.navList}>
          {NAV_LIST.map((item) => (
            <li key={item.id} className={ESTILOS_TAG.navItem}>
              <a href={item.href} className={ESTILOS_TAG.navLink}>
                {item.title}
              </a>
            </li>
          ))}
        </ul>

        {/* Botón hamburguesa */}
        <button className="flex lg:hidden text-white" onClick={toggleMenu}>
          {menuAbierto ? (
            <span className="text-2xl">x</span>
          ) : (
            <span className="text-2xl">☰</span>
          )}
        </button>
      </div>

      {/* Menú móvil desplegable */}
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
      {/* {menuAbierto && (
        
      )} */}
    </nav>
  );
};

export default NavBar;
