import { useEffect, useState } from "react";
import { obtenerInstagramFeed } from "../services/instagramService";

const useInstagramMedia = () => {
  const [feed, setFeed] = useState({ media: [], stories: [] });

  useEffect(() => {
    let activo = true;
    obtenerInstagramFeed().then((items) => {
      if (activo) setFeed(items);
    });

    return () => {
      activo = false;
    };
  }, []);

  return feed;
};

export default useInstagramMedia;
