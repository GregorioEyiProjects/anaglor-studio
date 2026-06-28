import { useState, useEffect } from "react";
import { getDisciplinas } from "../services/disciplinasService";

const useDisciplinas = () => {
  const [disciplinas, setDisciplinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDisciplinas = async () => {
      try {
        const data = await getDisciplinas();
        //console.log("Fetched disciplinas:", data); // Log the fetched data
        setDisciplinas(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDisciplinas();
  }, []);

  return { disciplinas, loading, error };
};

export default useDisciplinas;
