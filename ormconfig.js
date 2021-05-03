require('dotenv').config();

const dbConfig = {
  host: process.env.DB_URL || 'db',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'cdc',
};

/** @type {import('typeorm').ConnectionOptions} */
module.exports = {
  type: 'postgres',
  ...dbConfig,
  synchronize: false,
  logging: process.env.NODE_ENV !== 'production',
  entities: ['server/models/**/*.ts'],
  migrations: ['db/migrations/**/*.ts'],
  subscribers: ['server/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'server/models',
    migrationsDir: 'db/migrations',
    subscribersDir: 'server/subscriber',
  },
};
