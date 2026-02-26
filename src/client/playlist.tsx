import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import PlaylistDetails from './PlaylistDetails.tsx';
import type { PlaylistItem } from '../shared/spotifyData.d.ts';

declare global {
    interface Window {
      __ITEMS__: PlaylistItem[];
    }
};

hydrateRoot(document.getElementById('root')!,
    <React.StrictMode>
      <PlaylistDetails items={window.__ITEMS__}/>
    </React.StrictMode>
);