import express from 'express';
import path from 'path';
import ejs from "ejs"; // for bundling ejs
import session from 'express-session';
import * as env from './env.ts';
import render_server from './render-server.tsx';

import { handleCallback, redirectToSpotify } from './spotify.ts';

const app = express();

app.engine('ejs', ejs.renderFile);
app.set('view engine', 'ejs');
app.set('views', path.join(import.meta.dirname, '../views'));
app.use(express.static(path.join(import.meta.dirname, '../public')));

app.use(session({
    secret: env.getSessionSecret(),
    resave: false,
    saveUninitialized: true,
}));

app.get('/', render_server);

app.get('/spotify-login', redirectToSpotify);

app.get(env.getSpotifyCallbackUriPath(), async (req, res) => {
    await handleCallback(req, res);
});

const server = app.listen(3000, () => {
    console.log('Server runs on Port 3000');
});

process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
    });
});