'use strict';

import { DataTypes } from 'sequelize';

export default {
  async up(queryInterface) {
    await queryInterface.createTable('Vendedores', {
      Id_Vendedor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Cuit: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Vendedores');
  }
};
