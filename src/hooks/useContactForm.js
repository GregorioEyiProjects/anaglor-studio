// src/hooks/useContactForm.js
import { useState } from "react";
import { sendContactEmail } from "../services/emailService";
import { validateForm } from "../utils/formMethods";

const STATUS_FORM = {
  IDLE: "idle",
  LOADING: "loading",
  SENDING: "sending",
  SUCCESS: "success",
  ERROR: "error",
};

export const useContactForm = () => {
  const [status, setStatus] = useState(STATUS_FORM.IDLE);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    disciplina: "Pilates Máquina",
    horario: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({}); // Clear previous errors
    setStatus(STATUS_FORM.LOADING);

    try {
      await sendContactEmail(formData);
      setStatus(STATUS_FORM.SUCCESS);
      setFormData({
        name: "",
        email: "",
        phone: "",
        disciplina: "Pilates Máquina",
        horario: "",
        mensaje: "",
      });
    } catch {
      setStatus(STATUS_FORM.ERROR);
    }
  };

  return { status, errors, formData, handleChange, handleSubmit };
};
