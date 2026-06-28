// src/components/Contacto/Contacto.jsx

import React from "react";
import { useState } from "react";
import { useContactForm } from "../../hooks/useContactForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DisplayTextContainer from "../DisplayText";
import GlobalStyles from "../../styles/global";
import CONTACT_DATA from "./contactData";
import InputComponent from "../Global/InputComponent";
import LIST_OF_COURSES from "../Disciplinas/list_of_courses";
import ButtonComponent from "../Global/ButtonComponnent";

const ESTILOS_TAG = {
  grid: "grid grid-cols-1 md:grid-cols-2 md:gap-10",
  gridItem:
    "grid gap-2 md:grid grid-cols-[0.1fr_0.9fr] md:gap-1 p-4 rounded-lg shadow-md items-center",
  buttonContainer: "flex justify-center md:justify-end",
  loadingSpinnerContainer: "flex items-center gap-2 text-ag-muted text-sm",
  loadingSpinner:
    "w-4 h-4 border-2 border-ag-gold border-t-transparent rounded-full animate-spin",
};

const Contacto = () => {
  const { status, formData, handleChange, handleSubmit } = useContactForm();

  return (
    <section id="contacto" className={`${GlobalStyles.container} py-8`}>
      <DisplayTextContainer
        spanText="Reservas e información"
        h2Text="Empieza"
        emText="hoy"
      />
      <div className={ESTILOS_TAG.grid}>
        <div className="">
          {CONTACT_DATA.map((contact) => (
            <div key={contact.id} className={ESTILOS_TAG.gridItem}>
              <FontAwesomeIcon
                className="text-lg text-ag-gold"
                icon={contact.icon}
              />
              <div>
                <h3 className="text-lg font-bold">{contact.title}</h3>
                <p className="text-ag-muted">{contact.description}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <InputComponent
            label="Nombre"
            name="name"
            value={formData.name}
            placeholder="Tu nombre"
            onChange={handleChange}
          />
          <InputComponent
            label="Teléfono"
            name="phone"
            value={formData.phone}
            placeholder="Para contactarte"
            onChange={handleChange}
          />
          <InputComponent
            label="Disciplina"
            name="disciplina"
            value={formData.disciplina}
            placeholder="Tu disciplina"
            type="select"
            onChange={handleChange}
            options={LIST_OF_COURSES.map((course) => ({
              value: course.name,
              label: course.name,
            }))}
          />
          <InputComponent
            label="Horario preferido"
            name="horario"
            value={formData.horario}
            placeholder="Ej: mañanas entre semanas"
            onChange={handleChange}
          />
          <InputComponent
            label="Mensaje"
            name="mensaje"
            value={formData.mensaje}
            placeholder="Escribe tu mensaje"
            type="textarea"
            rows={4}
            onChange={handleChange}
          />

          {/* feedback de estado */}
          {status === "success" && (
            <p className="text-ag-gold">¡Mensaje enviado!</p>
          )}
          {status === "error" && (
            <p className="text-red-500">Error al enviar.</p>
          )}

          <div className={ESTILOS_TAG.buttonContainer}>
            {status === "loading" ? (
              <div className={ESTILOS_TAG.loadingSpinnerContainer}>
                <div className={ESTILOS_TAG.loadingSpinner} />
                <span>Enviando...</span>
              </div>
            ) : (
              <ButtonComponent type="submit" text="Enviar" />
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contacto;
