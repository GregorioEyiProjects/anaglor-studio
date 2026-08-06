// src/hooks/useHorarios.js

import { useState, useEffect } from "react";
import { getHorarios } from "../services/horariosService";

const useHorarios = () => {
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const data = await getHorarios();
        //console.log("Fetched horarios:", data);
        setHorarios(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHorarios();
  }, []);

  return { horarios, loading, error };
};

export default useHorarios;
