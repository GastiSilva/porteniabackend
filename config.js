import { Sequelize } from 'sequelize';
import 'dotenv/config';

// Los Postgres manejados (Neon, Render, Supabase, Railway) exigen SSL.
const useSSL = process.env.DB_SSL === 'true';

const options = {
  dialect: process.env.DB_DIALECT || 'postgres',
  logging: process.env.NODE_ENV === 'production' ? false : console.log,
  pool: { max: 5, min: 0, idle: 10000, acquire: 30000 },
  ...(useSSL && {
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
  }),
};

// En produccion la mayoria de los hosting entregan una unica connection string.
const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, options)
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        ...options,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
      }
    );

export default sequelize;
