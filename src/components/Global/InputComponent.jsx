// src/components/Global/InputComponent.jsx

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
  const errorId = error ? `${name}-error` : undefined;
  const commonProps = {
    id: name,
    name,
    "aria-invalid": Boolean(error),
    "aria-describedby": errorId,
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={name} className="font-bold text-sm uppercase font-body">
        {label}
      </label>
      {type === "select" ? (
        <select
          {...commonProps}
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
          {...commonProps}
          placeholder={placeholder}
          className={`${GLOBAL_STYLES.inputStyle} `}
          rows={rows}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          {...commonProps}
          placeholder={placeholder}
          type={type}
          className={`${GLOBAL_STYLES.inputStyle} w-full`}
          value={value}
          onChange={onChange}
          autoComplete={
            { name: "name", email: "email", phone: "tel" }[name]
          }
          inputMode={name === "phone" ? "tel" : undefined}
        />
      )}
      {error && (
        <p id={errorId} className="mb-3 text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputComponent;
