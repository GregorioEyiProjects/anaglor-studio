// src/components/Global/InputComponent.jsx

import React from "react";
import GLOBAL_STYLES from "../../styles/global";

const InputComponent = ({
  label,
  name,
  placeholder,
  type = "text",
  className = "",
  options = [],
  rows = 4,
  value,
  onChange,
  error,
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={name} className="font-bold text-sm uppercase font-body">
        {label}
      </label>
      {type === "select" ? (
        <select
          name={name}
          placeholder={placeholder}
          className={`${GLOBAL_STYLES.inputStyle} w-full`}
          value={value}
          onChange={onChange}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          name={name}
          placeholder={placeholder}
          className={`${GLOBAL_STYLES.inputStyle} `}
          rows={rows}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          name={name}
          placeholder={placeholder}
          type={type}
          className={`${GLOBAL_STYLES.inputStyle} w-full`}
          value={value}
          onChange={onChange}
        />
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default InputComponent;
