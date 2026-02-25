import type { Request, Response } from "express-serve-static-core";
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../client/App.tsx';
import type { InitialData } from "../shared/spotifyData.d.ts";
import * as sapi from "./spotifyApi.ts";

export default async function render(req: Request, res: Response) {
    let initialData: InitialData | null = null;
    if (req.session.token) {
        const t = req.session.token.accessToken;
        const profile = await sapi.getProfile(t);
        const playlists = await sapi.getUserPlaylists(t);
        console.log(playlists);
        initialData = {
            profile: profile,
            playlists: playlists,
        } satisfies InitialData;
    }
    const content = renderToString(<App initialData={initialData} />);
    res.render('index', { initialData: JSON.stringify(initialData) ?? "null", content: content });
}