import type { Request, Response } from "express-serve-static-core";
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../client/App.tsx';
import { InitialData } from "../shared/spotifyData.ts";

export default function render(req: Request, res: Response) {
    let initialData: InitialData | null = null;
    if (req.session.token) {
        initialData = {
            profile : {
                name: req.session.token.accessToken
            }, // TODO
        } satisfies InitialData;
    }
    const content = renderToString(<App initialData={initialData} />);
    res.render('index', { initialData: JSON.stringify(initialData) ?? "null", content: content });
}