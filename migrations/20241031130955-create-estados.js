'use strict';

import { DataTypes } from 'sequelize';

export default {
  async up(queryInterface) {
    await queryInterface.createTable('Estados', {
      Id_Estado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Estado: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Estados');
  }
};
