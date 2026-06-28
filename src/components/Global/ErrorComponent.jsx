import React from "react";

const ErrorComponent = ({ message }) => {
  return (
    <p className="text-center text-red-500 py-20">Error al cargar eventos.</p>
  );
};

export default ErrorComponent;
