import React from 'react';

const App = () => {
  const handleSpotifyLogin = () => {
    window.location.href = '/spotify-login';
  };
  return (
    <div>
      <h1>Spatz</h1>
      <p>(Spotify Statz)</p>
      <button onClick={handleSpotifyLogin}>Login to Spotify</button>
    </div>
  );
};

export default App;