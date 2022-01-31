import {getAccessToken} from './lib/spotify'
import {Router} from "itty-router";

const router = Router()

router.get("/top", async request => {
  const {access_token} = await getAccessToken();
  const url = new URL(request.url)

  const type = url.searchParams.get('type') ?? 'tracks'
  const time_range = url.searchParams.get('time_range') ?? 'short_term'
  const limit = url.searchParams.get('limit') ?? '20'
  const offset = url.searchParams.get('offset') ?? '0'

  const data = await fetch(`https://api.spotify.com/v1/me/top/${type}?time_range=${time_range}&limit=${limit}&offset=${offset}`, {
    cf: {
      cacheTtl: 3600,
      cacheEverything: true,
    },
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
      .then((r) => r.json())

  return new Response(JSON.stringify(data), {
    headers: {
      'content-type': 'application/json',
      'Cache-Control': 'max-age=3600'
    },
  })
})

router.get('/playing', async () => {
  const {access_token} = await getAccessToken();
  const data = await fetch(`https://api.spotify.com/v1/me/player/currently-playing`, {
    cf: {
      cacheTtl: 3600,
      cacheEverything: true,
    },
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
      .then((r) => r.json())

  return new Response(JSON.stringify(data), {
    headers: {
      'content-type': 'application/json',
      'Cache-Control': 'max-age=300'
    },
  })
})

router.all('*', () => new Response('Not Found.', {status: 404}))

addEventListener('fetch', event => {
  event.respondWith(router.handle(event.request))
})
