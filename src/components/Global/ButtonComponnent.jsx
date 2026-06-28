import React from "react";
import GLOBAL_STYLES from "../../styles/global";

const ButtonComponent = ({ text, onClick, href, type, className = "" }) => {
  if (href) {
    return (
      <a href={href} className={`${GLOBAL_STYLES.buttonStyle} ${className}`}>
        {text}
      </a>
    );
  }

  return (
    <button
      className={`${GLOBAL_STYLES.buttonStyle} ${className}`}
      onClick={onClick}
      type={type || "button"}
    >
      {text}
    </button>
  );
};

export default ButtonComponent;
