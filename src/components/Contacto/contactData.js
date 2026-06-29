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
    description: "Av. de Bruselas, 38, Salamanca, 28028 Madrid",
    link: "https://maps.app.goo.gl/kM4wzKzHh7zKMtE57",
  },
  {
    id: 2,
    icon: faPhone,
    title: "Teléfono",
    description: "+34 654 643 717",
    link: "tel:+34654643717",
  },
  {
    id: 3,
    icon: faEnvelope,
    title: "Correo electrónico",
    description: "ag@anaglorstudio.com",
    link: "mailto:ag@anaglorstudio.com",
  },
  {
    id: 4,
    icon: faInstagram,
    title: "Instagram",
    description: "@anaglorstudio",
    link: "https://www.instagram.com/anaglorstudio",
  },
];

export default CONTACT_DATA;
