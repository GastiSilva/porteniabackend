'use strict';
import { DataTypes } from 'sequelize';

export default {
  async up(queryInterface) {
    await queryInterface.createTable('Conceptos', {
      id_Concepto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Concepto: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Valor: {
        type: DataTypes.DECIMAL(10, 2), // Definir un valor decimal con precisión de 10 y escala de 2
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Conceptos');
  }
};
