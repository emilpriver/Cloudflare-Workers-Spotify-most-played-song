import { Buffer } from 'buffer/';
import { SpotifyAccessTokenResponse } from '../types/spotify';

interface Env extends ServiceWorkerGlobalScope {
  SPOTIFY_CLIENT_ID: string
  SPOTIFY_CLIENT_SECRET: string
  SPOTIFY_REFRESH_TOKEN: string
}

const env = self as Env

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = env

const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');

export const getAccessToken = (): Promise<SpotifyAccessTokenResponse> => fetch("https://accounts.spotify.com/api/token", {
  method: 'POST',
  headers: {
    Authorization: `Basic ${basic}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: SPOTIFY_REFRESH_TOKEN
  })
})
  .then((r) => r.json())
  .then((r) => {
    return r as SpotifyAccessTokenResponse
  })