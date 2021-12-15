import { getAccessToken } from './lib/spotify'

export async function handleRequest(request: Request): Promise<Response> {
  const { access_token } = await getAccessToken();
  const url = new URL(request.url)

  const time_range = url.searchParams.get('time_range') ?? 'short_term'
  const limit = url.searchParams.get('time_range') ?? '20'
  const offset = url.searchParams.get('time_range') ?? '0'

  let response = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${time_range}&limit=${limit}&offset=${offset}`, {
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
