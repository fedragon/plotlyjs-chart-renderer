import express, { json, urlencoded } from 'express';
import logger from 'morgan';
import compression from 'compression';
import render from './render.js';

const createApp = (browser) => {
  const app = express();

  app.use(logger('dev'));
  app.use(compression());
  app.use(json());
  app.use(urlencoded({ extended: true }));

  app.post('/', (req, res, next) => {
    render(browser, req.body)
      .then((data) => res.send(data))
      .catch((err) => next(err));
  });

  return app;
}

export default createApp;
