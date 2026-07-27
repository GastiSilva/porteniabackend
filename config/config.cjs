require('dotenv').config();

const dialect = process.env.DB_DIALECT || 'postgres';

// Los Postgres manejados (Neon, Render, Supabase, Railway) exigen SSL.
const ssl = process.env.DB_SSL === 'true'
  ? { dialectOptions: { ssl: { require: true, rejectUnauthorized: false } } }
  : {};

// Si el hosting entrega una connection string, sequelize-cli la usa directamente.
const base = process.env.DATABASE_URL
  ? { url: process.env.DATABASE_URL, dialect, ...ssl }
  : {
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect,
      ...ssl,
    };

module.exports = {
  development: base,
  test: base,
  production: base,
};
