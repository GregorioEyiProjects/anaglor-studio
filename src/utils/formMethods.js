// src/utils/formMethods.js

export const validateForm = (formData) => {
  const errors = {};

  // Validar nombre
  if (!formData.name.trim()) {
    errors.name = "El nombre es obligatorio";
  }

  if (!formData.email.trim() && !formData.phone.trim()) {
    errors.email = "Indica un email o un teléfono";
  } else if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "El email no es válido";
  }

  if (formData.phone.trim() && !/^[\d\s+-]{9,15}$/.test(formData.phone)) {
    errors.phone = "El teléfono debe tener entre 9 y 15 dígitos";
  }

  if (!formData.disciplina.trim() || formData.disciplina === "") {
    errors.disciplina = "Selecciona una disciplina válida";
  }

  if (!formData.horario.trim()) {
    errors.horario = "El horario preferido es obligatorio";
  }

  return errors;
};
