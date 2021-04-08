module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['dist/app/models/*.js'],
  migrations: ['dist/database/migrations/*.js'],
  extra: {
    ssl: true,
  },
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};
