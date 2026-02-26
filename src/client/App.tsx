import React from 'react';
import type { InitialData, Playlist, Image } from '../shared/spotifyData.d.ts';

type AppProps = {
  initialData: InitialData | null,
}

function getClosestToSizeImage(images: Image[], prefHeight: number): Image | null {
  let closest: Image | null = null;
  for (const i of images) {
    if (!closest || (closest.height && i.height &&
        (Math.abs(closest.height - prefHeight) > Math.abs(i.height - prefHeight)))) {
      closest = i;
    }
  }
  return closest;
}

function Playlist(playlist: Playlist) {
  const i = getClosestToSizeImage(playlist.images, 200);
  if (i) {
    return (
    <div key={playlist.id}>
      <a href={`/playlist/${playlist.id}`}>
        <img src={ i.url } height="200"/>
        {playlist.name}
      </a>
    </div>);
  } else {
    return <div key={playlist.id}><a href={`/playlist/${playlist.id}`}>{playlist.name}</a></div>;
  }
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
