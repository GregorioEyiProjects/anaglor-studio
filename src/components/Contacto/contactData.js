// src/components/Contacto/contactData.js

import {
  faLocationDot,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

const CONTACT_DATA = [
  {
    id: 1,
    icon: faLocationDot,
    title: "Dirección",
    description: "Calle de la Danza, 123, Ciudad, País",
  },
  {
    id: 2,
    icon: faPhone,
    title: "Teléfono",
    description: "+34 123 456 789",
  },
  {
    id: 3,
    icon: faEnvelope,
    title: "Correo electrónico",
    description: "ag@anaglorstudio.com",
  },
  {
    id: 4,
    icon: faInstagram,
    title: "Instagram",
    description: "@anaglorstudio",
  },
];

export default CONTACT_DATA;
