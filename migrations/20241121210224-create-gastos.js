'use strict';
import { DataTypes } from 'sequelize';

export default {
  async up(queryInterface) {
    await queryInterface.createTable('Gastos', {
      Id_Gastos: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      Gastos: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Importe: {
        type: DataTypes.DECIMAL(10, 2), // Incluyendo precisión para decimales
        allowNull: false,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Gastos');
  },
};
