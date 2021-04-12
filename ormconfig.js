const { resolve } = require('path');

const mainFolder = process.env.NODE_ENV ? 'dist' : 'src';
const tsOrJsExtension = mainFolder === 'src' ? 'ts' : 'js';

module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [
    resolve(
      __dirname,
      `${mainFolder}`,
      'app',
      'models',
      `*.${tsOrJsExtension}`,
    ),
  ],
  migrations: [
    resolve(
      __dirname,
      `${mainFolder}`,
      'database',
      'migrations',
      `*.${tsOrJsExtension}`,
    ),
  ],
  synchronize: process.env.NODE_ENV ? true : false,
  ssl: process.env.NODE_ENV ? true : false,
  extra: process.env.NODE_ENV
    ? {
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {},
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};
