import React from 'react';
import type { InitialData, Playlist } from '../shared/spotifyData.d.ts';

type AppProps = {
  initialData: InitialData | null,
}

function Playlist(playlist: Playlist) {
  return <div key={playlist.id}>{playlist.name}</div>;
}

export default function App({initialData}: AppProps) {
  if (!initialData) {
    const handleSpotifyLogin = () => {
        window.location.href = '/spotify-login';
    };
    return (
      <div>
        <button onClick={handleSpotifyLogin}>Login to Spotify</button>
      </div>
    );
  } else {
    let image = null;
    const p = initialData.profile;
    for (const i of p.images) {
      image = <img src={i.url} height={i.height ?? 200} width={i.width ?? 200}/>;
    }

    if (!image) {
      image = <span>No Image</span>;
    }

    const playlists = initialData.playlists.map((p) => Playlist(p));

    return (
      <div>
        <div>Logged in as: {p.display_name}</div>
        <div>ID: {p.id}</div>
        <div>{image}</div>
        <div>Country: {p.country}</div>
        <div>Playlists:
        {playlists}
        </div>
      </div>
    );
  }
};
