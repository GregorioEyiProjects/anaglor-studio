// src/services/horariosService.js

import supabase from "./supabaseClient";
import HORARIOS_DATA from "../components/Horarios/horarios";

const localHorarios = HORARIOS_DATA.flatMap((fila) =>
  Object.entries(fila.dias).flatMap(([dia, clases]) =>
    clases.map((clase) => ({
      ...clase,
      dia,
      hora: fila.hora,
    })),
  ),
);

export const getHorarios = async () => {
  if (!supabase) {
    //console.warn("Supabase client is not initialized, using local data.");
    return localHorarios;
  }

  const { data, error } = await supabase
    .from("horarios")
    .select("*")
    .eq("visible", true);

  if (error) {
    //console.warn("Error fetching horarios, using local data:", error);
    return localHorarios;
  }

  return data;
};
