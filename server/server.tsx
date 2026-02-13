import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../client/App.tsx';
import path from 'path';
import ejs from "ejs"; // for bundling ejs

const app = express();

app.engine('ejs', ejs.renderFile);
app.set('view engine', 'ejs');
app.set('views', path.join(import.meta.dirname, '../views'));
app.use(express.static('public'));

app.get('/', (req, res) => {
  const content = renderToString(<App />);
  res.render('index', { content });
});

app.listen(3000, () => {
  console.log('Server läuft auf http://localhost:3000');
});