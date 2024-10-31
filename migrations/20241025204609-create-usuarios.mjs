import { DataTypes } from 'sequelize';
//  import sequelize from '../database/config.js'; // Ajusta la ruta según tu estructura

export default {
    up: async (queryInterface) => {
        await queryInterface.createTable('Usuarios', {
            id_Usuario: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            Usuario: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Contrasenia: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('Usuarios');
    },
};