import type { Request, Response } from "express-serve-static-core";
import crypto from 'node:crypto';
import * as env from './env.ts';
import querystring from 'node:querystring';

const clientId = env.getSpotifyClientId();
const clientSecret = env.getSpotifyClientSecret();
const spotifyCallback = env.getSpotifyCallbackUri();
type StoreType = {
    [state: string]: { used: boolean }
};
const stateStore = {} as StoreType;

export function redirectToSpotify(res: Response) {
    const state = crypto.randomBytes(16).toString('hex');
    stateStore[state] = { used: false };
    const scope = 'user-read-private user-read-email';

    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: process.env.SPOTIFY_CLIENT_ID,
            scope: scope,
            redirect_uri: spotifyCallback,
            state: state
        }));
}

export async function handleCallback(req: Request, res: Response) {
    const stateFromQuery = req.query.state as string;
    if (!stateStore[stateFromQuery] || stateStore[stateFromQuery].used) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            })
        );
    } else {
        const request = new Request("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (Buffer.from(clientId + ':' + clientSecret).toString('base64'))
            },
            body: new URLSearchParams({
                'code': req.query.code as string,
                'redirect_uri': spotifyCallback,
                'grant_type': 'authorization_code'
            })
        });

        const response = await fetch(request).then(r => r.json());
        console.log(response);
        res.send(response);
    }
}