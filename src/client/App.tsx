import React from 'react';
import { InitialData } from '../shared/spotifyData.ts';

type AppProps = {
  initialData: InitialData | null,
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
    return <div>Logged in as: <span>{initialData.profile.name}</span></div>;
  }
};
