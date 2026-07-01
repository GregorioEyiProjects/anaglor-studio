// src/utils/formMethods.js

export const validateForm = (formData) => {
  const errors = {};

  // Validar nombre
  if (!formData.name.trim()) {
    errors.name = "El nombre es obligatorio";
  }

  if (!formData.email.trim()) {
    errors.email = "El email es obligatorio";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "El email no es válido";
  }

  if (!formData.phone.trim()) {
    errors.phone = "El teléfono es obligatorio";
  } else if (!/^[\d\s\-\+]{9,15}$/.test(formData.phone)) {
    errors.phone = "El teléfono debe tener 9 y 15 dígitos";
  }

  if (!formData.disciplina.trim() || formData.disciplina === "") {
    errors.disciplina = "La disciplina nno valida";
  }

  if (!formData.horario.trim()) {
    errors.horario = "El horario preferido es obligatorio";
  }

  return errors;
};
