import { Sequelize } from 'sequelize';
// import config from './config/config.json' assert { type: "json" }; // Importa el archivo JSON con assert
import { readFileSync } from 'fs';

const config = JSON.parse(readFileSync('./config/config.json', 'utf-8'));



// Determina el entorno, normalmente "development" o "production"
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: console.log,
});

export default sequelize;
