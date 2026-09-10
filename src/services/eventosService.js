// src/services/eventosService.js

import supabase from "./supabaseClient";

const EVENTOS_BUCKET = "carteles";

const getImageUrl = (imagePath) => {
  if (!imagePath) return null;

  if (imagePath.startsWith("http://") || imagePath.startsWith("https://"))
    return imagePath;

  const { data } = supabase.storage
    .from(EVENTOS_BUCKET)
    .getPublicUrl(imagePath);

  return data.publicUrl;
};

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

  return data.map((evento) => ({
    ...evento,
    image_url: getImageUrl(evento.image_url),
  }));
};
