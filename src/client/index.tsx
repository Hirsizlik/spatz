import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import { InitialData } from '../shared/spotifyData.ts';

declare global {
    interface Window {
      __INITIAL_DATA__: InitialData;
    }
};

hydrateRoot(document.getElementById('root')!, 
    <React.StrictMode>
      <App initialData={window.__INITIAL_DATA__}/>
    </React.StrictMode>
);