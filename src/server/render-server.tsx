import type { Response } from "express-serve-static-core";
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../client/App.tsx';

export default function render(res: Response) {
    const content = renderToString(<App />);
    res.render('index', { content });
}