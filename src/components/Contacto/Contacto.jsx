// src/components/Contacto/Contacto.jsx

import { useContactForm } from "../../hooks/useContactForm";

import DisplayTextContainer from "../DisplayText";
import GlobalStyles from "../../styles/global";
import CONTACT_DATA from "./contactData";
import InputComponent from "../Global/InputComponent";
import LIST_OF_COURSES from "../Disciplinas/list_of_courses";
import ButtonComponent from "../Global/ButtonComponnent";
import ContactIcon from "./ContactIcon";

const ESTILOS_TAG = {
  grid: "grid grid-cols-1 md:grid-cols-2 md:gap-10",
  gridItem:
    "liquid-glass-soft liquid-glass-interactive mb-3 grid grid-cols-[3rem_1fr] items-center gap-2 overflow-hidden rounded-lg p-4 md:gap-1",
  buttonContainer: "flex justify-center md:justify-end",
  loadingSpinnerContainer: "flex items-center gap-2 text-ag-muted text-sm",
  loadingSpinner:
    "w-4 h-4 border-2 border-ag-gold border-t-transparent rounded-full animate-spin",
  faIcon: "text-lg text-ag-gold cursor-pointer ",
};

const Contacto = () => {
  const { status, errors, formData, handleChange, handleSubmit } =
    useContactForm();
  //const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      id="contacto"
      className={`${GlobalStyles.container} min-h-[calc(100svh-5rem)] py-8`}
    >
      <DisplayTextContainer
        spanText="Reservas e información"
        h2Text="Empieza"
        emText="hoy"
      />
      <div className={ESTILOS_TAG.grid} data-reveal>
        <div className="">
          {CONTACT_DATA.map((contact) => (
            <div key={contact.id} className={`${ESTILOS_TAG.gridItem}`}>
              <ContactIcon
                iconStyle={ESTILOS_TAG.faIcon}
                icon={contact.icon}
                link={contact.link}
                hoverColor={contact.hoverColor}
              />

              <div>
                <h3 className="text-lg font-bold">{contact.title}</h3>
                <a
                  href={contact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ag-muted hover:text-ag-gold cursor-pointer transition-colors duration-200"
                >
                  {contact.description}
                </a>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <p className="mb-5 text-sm leading-6 text-ag-muted">
            Déjanos un email o un teléfono para responderte personalmente.
          </p>
          <InputComponent
            label="Nombre"
            name="name"
            value={formData.name}
            placeholder="Introduce tu nombre"
            onChange={handleChange}
            error={errors.name}
          />

          <InputComponent
            label="Email"
            name="email"
            value={formData.email}
            placeholder="Introduce tu email"
            type="email"
            onChange={handleChange}
            error={errors.email}
          />
          <InputComponent
            label="Teléfono"
            name="phone"
            value={formData.phone}
            placeholder="Introduce tu teléfono para estar en contacto"
            type="tel"
            onChange={handleChange}
            error={errors.phone}
          />
          <InputComponent
            label="Disciplina"
            name="disciplina"
            value={formData.disciplina}
            placeholder="Tu disciplina"
            type="select"
            onChange={handleChange}
            error={errors.disciplina}
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
            error={errors.horario}
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
