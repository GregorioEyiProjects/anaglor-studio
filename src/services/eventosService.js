import supabase from "./supabaseClient";

export const getEventos = async () => {
  const { data, error } = await supabase
    .from("eventos")
    .select("*")
    .eq("activo", true)
    .order("fecha", { ascending: true });

  if (error) {
    console.log("Error fetching eventos:", error);
    throw error;
  }

  return data;
};
