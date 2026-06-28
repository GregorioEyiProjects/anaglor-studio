// hooks/useEventos.js

import { useState, useEffect } from "react";
import { getEventos } from "../services/eventosService";

const useEventos = () => {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const eventosData = await getEventos();
        setEventos(eventosData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, []);

  return { eventos, loading, error };
};

export default useEventos;
