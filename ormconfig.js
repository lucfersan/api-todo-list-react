const mainFolder = process.env.NODE_ENV ? 'dist' : 'src';

let productionConfig = null;
if (mainFolder === 'dist') {
  productionConfig = {
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  };
}

module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [`${mainFolder}/app/models/*.js`],
  migrations: [`${mainFolder}/database/migrations/*.js`],
  synchronize: true,
  productionConfig,
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};
