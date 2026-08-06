// src/services/instagramService.js

const FEED_ENDPOINT = import.meta.env.VITE_INSTAGRAM_FEED_ENDPOINT;

const normalizarMedia = (item) => {
  const mediaType = item.media_type || item.mediaType;
  const imageUrl =
    mediaType === "VIDEO"
      ? item.thumbnail_url || item.thumbnailUrl
      : item.media_url || item.mediaUrl;

  if (!item.id || !imageUrl) return null;

  return {
    id: item.id,
    src: imageUrl,
    alt: item.caption?.trim() || "Momento reciente de AnaGlor Studio",
    label: item.caption?.split(/[.!?\n]/)[0]?.trim() || "Desde el estudio",
    href: item.permalink || "https://www.instagram.com/anaglorstudio/",
    timestamp: item.timestamp || "",
  };
};

const normalizarLista = (items) =>
  Array.isArray(items) ? items.map(normalizarMedia).filter(Boolean) : [];

export const obtenerInstagramFeed = async () => {
  console.log("obtenerInstagramFeed - FEED_ENDPOINT:", FEED_ENDPOINT);

  if (!FEED_ENDPOINT) return { media: [], stories: [] };

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 6000);

  try {
    const response = await fetch(FEED_ENDPOINT, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    if (!response.ok)
      throw new Error(
        `Error al obtener el feed de Instagram: ${response.status} ${response.statusText}`,
      );

    const payload = await response.json();
    console.warn("obtenerInstagramFeed - payload:", payload);
    const media = Array.isArray(payload) ? payload : payload.data;

    return {
      media: normalizarLista(media),
      stories: normalizarLista(payload.stories),
    };
  } catch (error) {
    console.warn("Error al obtener el feed de Instagram:", error);
    return { media: [], stories: [] };
  } finally {
    window.clearTimeout(timeout);
  }
};
