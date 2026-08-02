// src/components/Contacto/contactData.js

import {
  faLocationDot,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import STUDIO_CONFIG from "../../config/studio";

const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  STUDIO_CONFIG.direccion,
)}`;

const CONTACT_DATA = [
  {
    id: 1,
    icon: faLocationDot,
    title: "Dirección",
    description: STUDIO_CONFIG.direccion,
    link: mapsLink,
    hoverColor: "#EA4335",
  },
  {
    id: 2,
    icon: faPhone,
    title: "Teléfono",
    description: STUDIO_CONFIG.telefono,
    link: "tel:+34654643717",
    hoverColor: "#25D366",
  },
  {
    id: 3,
    icon: faEnvelope,
    title: "Correo electrónico",
    description: STUDIO_CONFIG.email,
    link: `mailto:${STUDIO_CONFIG.email}`,
    hoverColor: "#C9A96E",
  },
  {
    id: 4,
    icon: faInstagram,
    title: "Instagram",
    description: STUDIO_CONFIG.instagram,
    link: `https://www.instagram.com/${STUDIO_CONFIG.instagram.replace("@", "")}`,
    hoverColor: "#E1306C",
  },
];

export default CONTACT_DATA;
