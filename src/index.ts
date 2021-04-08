import 'reflect-metadata';
import dotenv from 'dotenv';

import express from 'express';
import routes from './routes';
import cors from 'cors';

import './database';

const app = express();

app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  res.header('Access-Control-Allow-Origin', 'https://listlucas.netlify.app/');
  res.header('Access-Control-Allow-Methods', 'GET,PATCH, POST, PUT,DELETE');
  app.use(cors());
  next();
});
app.use(express.json());
app.use(routes);

dotenv.config();

app.listen(process.env.PORT || 3333, () => console.log('🚀 Server Running!'));
