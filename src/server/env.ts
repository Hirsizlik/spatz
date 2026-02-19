function getEnvVarChecked(name: string): string {
    const e = process.env[name];
    if (e) {
        return e;
    } else {
        throw Error(`Env var ${name} missing`);
    }
}

export function getSessionSecret(): string {
    return getEnvVarChecked("SESSION_SECRET");
}

export function getSpotifyClientId(): string {
    return getEnvVarChecked("SPOTIFY_CLIENT_ID");
}

export function getSpotifyClientSecret(): string {
    return getEnvVarChecked("SPOTIFY_CLIENT_SECRET");
}

export function getSpotifyCallbackUri(): string {
    return getEnvVarChecked("SPOTIFY_CALLBACK_ORIGIN") + getSpotifyCallbackUriPath();
}

export function getSpotifyCallbackUriPath(): string {
    return '/spotify-callback';
}