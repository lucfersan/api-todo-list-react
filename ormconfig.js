const mainFolder = process.env.NODE_ENV ? 'dist' : 'src';

module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [`${mainFolder}/app/models/*.js`],
  migrations: [`${mainFolder}/database/migrations/*.js`],
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
