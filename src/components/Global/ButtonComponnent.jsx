// src/components/Global/ButtonComponnent.jsx
import React from "react";
import GLOBAL_STYLES from "../../styles/global";

const ButtonComponent = ({ text, onClick, href, type, className = "" }) => {
  if (href) {
    return (
      <a href={href} className={`${className} ${GLOBAL_STYLES.buttonStyle} `}>
        {text}
      </a>
    );
  }

  return (
    <button
      className={`${className} ${GLOBAL_STYLES.buttonStyle} `}
      onClick={onClick}
      type={type || "button"}
    >
      {text}
    </button>
  );
};

export default ButtonComponent;
