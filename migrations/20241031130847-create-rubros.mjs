'use strict';

import { DataTypes } from 'sequelize';

export default {
  async up(queryInterface) {
    await queryInterface.createTable('Rubros', {
      Id_Rubro: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Rubro: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Rubros');
  }
};
