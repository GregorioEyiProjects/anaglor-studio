// src/components/Contacto/ContactIcon.jsx

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ContactIcon = ({ icon, link, hoverColor, iconStyle = "" }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <FontAwesomeIcon
      className={iconStyle}
      style={{ color: isHovered ? hoverColor : "#888880" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      icon={icon}
      onClick={() => window.open(link, "_blank")}
    />
  );
};

export default ContactIcon;
