// supabase

const corsHeaders = {
  "Access-Control-Allow-Origin": Deno.env.get("SITE_ORIGIN") || "*",
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

const response = (body: unknown, status = 200) =>
  Response.json(body, {
    status,
    headers: {
      ...corsHeaders,
      "Cache-Control": "public, max-age=300, s-maxage=900",
    },
  });

const fetchCollection = async (
  baseUrl: string,
  path: string,
  accessToken: string,
) => {
  const url = new URL(`${baseUrl}/${path}`);
  url.searchParams.set(
    "fields",
    "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp",
  );

  url.searchParams.set("access_token", accessToken);

  const result = await fetch(url);
  if (!result.ok) return [];
  const payload = await result.json();
  return Array.isArray(payload.data) ? payload.data : [];
};

Done.server(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (request.method !== "GET") {
    return response({ error: "Method not allowed" }, 405);
  }

  const accessToken = Deno.env.get("INSTAGRAM_ACCESS_TOKEN");
  const userId = Deno.env.get("INSTAGRAM_USER_ID");
  const apiVersion = Deno.env.get("INSTAGRAM_API_VERSION");

  if (!accessToken || !userId || !apiVersion) {
    return response({ error: "Instagram sync is not configured" }, 503);
  }

  const baseUrl = `https://graph.facebook.com/${apiVersion}/${userId}`;

  const [media, stories] = await Promise.all([
    fetchCollection(baseUrl, "media", accessToken),
    fetchCollection(baseUrl, "stories", accessToken),
  ]);

  return response({
    data: media,
    stories,
    syncedAt: new Date().toISOString(),
  });
});
