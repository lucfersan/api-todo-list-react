import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import routes from './routes';
import cors from 'cors';

import './database';

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://listlucas.netlify.app/');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  app.use(cors());
  next();
});
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333, () => console.log('🚀 Server Running!'));
