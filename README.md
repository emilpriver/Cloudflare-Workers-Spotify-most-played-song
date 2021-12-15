# My most played songs on Spotify Cloudflare Worker.

This project fetches my most played songs on Spotify and display as a REST at https://api.priver.se/spotify/top/tracks


# Want to deploy your own Spotify most played songs?
Steps:
  - Clone this repo.
  - Obtain Spotify client id, client secret, refresh token.
  - Add those secrets to Cloudflare Workers with this names:
    - SPOTIFY_CLIENT_ID
    - SPOTIFY_CLIENT_SECRET
    - SPOTIFY_REFRESH_TOKEN
  - You should now be able to push the worker to Cloudflare and use the api