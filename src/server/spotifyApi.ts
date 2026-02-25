import type { Profile, Playlist } from '../shared/spotifyData.d.ts';

export type Token = {
    accessToken: string,
    tokenType: string,
    expiresInSec: number,
    refreshToken: string,
    scope: string[],
    createTimestamp: number
}

export async function getToken(code: string, clientId: string, clientSecret: string, callbackUri: string): Promise<Token> {
    const request = new Request("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (Buffer.from(clientId + ':' + clientSecret).toString('base64'))
        },
        body: new URLSearchParams({
            'code': code as string,
            'redirect_uri': callbackUri,
            'grant_type': 'authorization_code'
        })
    });

    const response = await fetch(request).then(r => r.json());
    return {
        accessToken: response.access_token,
        tokenType: response.token_type,
        expiresInSec: response.expires_in,
        refreshToken: response.refresh_token,
        scope: (response.scope as string).split(' '),
        createTimestamp: Date.now()
    } satisfies Token;
}

function newGetRequest(url: string, accessToken: string) {
    return new Request(url, {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken,
        }
    });
}

function parse(r: Response) {
    if (r.ok) {
        return r.json();
    } else {
        return r.text().then(t => { throw new Error(`${r.status} ${t}`); });
    }
}

export async function getProfile(accessToken: string): Promise<Profile> {
    const request = newGetRequest("https://api.spotify.com/v1/me", accessToken);
    return await fetch(request).then(parse);
}

export async function getUserPlaylists(accessToken: string): Promise<Playlist[]> {
    const request = newGetRequest("https://api.spotify.com/v1/me/playlists", accessToken);
    // TODO issue multiple requests if next is not null
    return await fetch(request).then(parse).then(p => p.items);
}