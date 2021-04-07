import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import routes from './routes';
import cors from 'cors';

import './database';

const app = express();

app.use(
  cors({
    origin: 'https://listlucas.netlify.app/',
  }),
);
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333, () => console.log('🚀 Server Running!'));
