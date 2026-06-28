// src/hooks/useContactForm.js
import { useState } from "react";
import { sendContactEmail } from "../services/emailService";

const STATUS_FORM = {
  IDLE: "idle",
  LOADING: "loading",
  SENDING: "sending",
  SUCCESS: "success",
  ERROR: "error",
};

export const useContactForm = () => {
  const [status, setStatus] = useState(STATUS_FORM.IDLE);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    disciplina: "",
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
    setStatus(STATUS_FORM.LOADING);
    try {
      await sendContactEmail(formData);
      setStatus(STATUS_FORM.SUCCESS);
      setFormData({
        name: "",
        phone: "",
        disciplina: "",
        horario: "",
        mensaje: "",
      });
    } catch (error) {
      setStatus(STATUS_FORM.ERROR);
    }
  };

  return { status, formData, handleChange, handleSubmit };
};
