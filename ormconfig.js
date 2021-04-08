module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['dist/app/models/*.js'],
  migrations: ['dist/database/migrations/*.js'],
  synchronize: true,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};
