import { getAccessToken } from './lib/spotify'

export async function handleRequest(request: Request): Promise<Response> {
  const { access_token } = await getAccessToken();

  let response = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=short_term', {
    cf: {
      cacheTtl: 3600,
      cacheEverything: true,
    },
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });

  response = new Response(response.body, response)
  response.headers.set("Cache-Control", "max-age=3600")
  return response
}
