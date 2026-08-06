//src/services/disciplinasService.js

import supabase from "./supabaseClient";

export const getDisciplinas = async () => {
  const { data, error } = await supabase
    .from("disciplinas")
    .select(`*, tarifas (*)`)
    .eq("activo", true);

  if (error) {
    console.log("Error fetching disciplinas:", error);
    throw error;
  }

  return data;
};
