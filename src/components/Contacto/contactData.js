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
    hoverColor: "#EA4335",
  },
  {
    id: 2,
    icon: faPhone,
    title: "Whatsapp",
    description: "+34 654 643 717",
    link: "https://wa.me/34654643717?text=Hola%2C%20he%20visto%20vuestra%20web%20y%20me%20gustar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n%20sobre%20vuestros%20servicios.",
    hoverColor: "#25D366",
  },
  {
    id: 3,
    icon: faEnvelope,
    title: "Correo electrónico",
    description: "ag@anaglorstudio.com",
    link: "mailto:ag@anaglorstudio.com",
    hoverColor: "#C9A96E",
  },
  {
    id: 4,
    icon: faInstagram,
    title: "Instagram",
    description: "@anaglorstudio",
    link: "https://www.instagram.com/anaglorstudio",
    hoverColor: "#E1306C",
  },
];

export default CONTACT_DATA;
