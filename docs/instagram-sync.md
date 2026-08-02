# Sincronización de Instagram

La web funciona desde el primer momento con historias destacadas guardadas en
el propio proyecto. La conexión automática añade las publicaciones recientes a
la galería y las historias que sigan activas al destacado **Ahora**.

## Requisitos

- Cuenta de Instagram profesional (Business o Creator).
- Aplicación de Meta con acceso a la cuenta.
- Identificador de usuario de Instagram y token con permisos de lectura.
- Proyecto de Supabase donde desplegar `instagram-feed`.

## Activación

1. Despliega `supabase/functions/instagram-feed` en el proyecto de Supabase.
2. Guarda como secretos `INSTAGRAM_ACCESS_TOKEN`, `INSTAGRAM_USER_ID`,
   `INSTAGRAM_API_VERSION` y `SITE_ORIGIN`.
3. Añade a `.env` la variable `VITE_INSTAGRAM_FEED_ENDPOINT` usando como valor
   la URL pública de la función.
4. Vuelve a publicar la web.

El token solo se lee dentro de la función segura y nunca llega al navegador.
Cuando Meta no esté disponible, la página utiliza automáticamente las imágenes
locales. Las historias destacadas antiguas se mantienen desde el propio proyecto
porque la API oficial no ofrece esas colecciones permanentes como un feed.
