const ErrorComponent = ({ message }) => {
  return (
    <p className="text-center text-red-500 py-20">
      {message || "Error al cargar la información."}
    </p>
  );
};

export default ErrorComponent;
