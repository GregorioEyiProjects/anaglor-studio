// src/services/horariosService.js

import supabase from "./supabaseClient";

export const getHorarios = async () => {
  const { data, error } = await supabase
    .from("horarios")
    .select("*")
    .eq("visible", true);

  if (error) {
    console.log("Error fetching horarios:", error);
    throw error;
  }

  return data;
};
