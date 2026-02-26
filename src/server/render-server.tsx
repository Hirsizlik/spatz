import type { Request, Response } from "express-serve-static-core";
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../client/App.tsx';
import PlaylistDetails from '../client/PlaylistDetails.tsx';
import type { InitialData } from "../shared/spotifyData.d.ts";
import * as sapi from "./spotifyApi.ts";

export async function renderIndex(req: Request, res: Response) {
    let initialData: InitialData | null = null;
    if (req.session.token) {
        const t = req.session.token.accessToken;
        const profile = await sapi.getProfile(t);
        const playlists = await sapi.getUserPlaylists(t);
        initialData = {
            profile: profile,
            playlists: playlists,
        } satisfies InitialData;
    }
    const content = renderToString(<App initialData={initialData} />);
    res.render('index', { initialData: JSON.stringify(initialData) ?? "null", content: content });
}

export async function renderPlaylist(req: Request, res: Response) {
    if (!req.session.token) {
        res.send("No Token");
        return;
    }
    const t = req.session.token.accessToken;
    const id = req.params.playlistId as string;
    const items = await sapi.getPlaylistContent(t, id);
    const content = renderToString(<PlaylistDetails items={items} />);
    res.render('playlist', { items: JSON.stringify(items) ?? "null", content: content });
}
