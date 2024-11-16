// migrations/XXXX-create-remitos.js
'use strict';

import { DataTypes } from 'sequelize';

export default {
  async up(queryInterface) {
    await queryInterface.createTable('Remitos', {
      Id_Remito: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Id_Producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Productos', // Cambia esto al nombre de tu tabla de productos
          key: 'Id_Producto'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL' // O 'CASCADE', según tu lógica de negocio
      },
      Numero: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      Precio: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      Cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      Total: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      Subtotal: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      Id_Estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Estados', // Cambia esto al nombre de tu tabla de estados
          key: 'Id_Estado'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL' // O 'CASCADE', según tu lógica de negocio
      },
      Modelo: {
        type: DataTypes.STRING, // Cambia esto al tipo de datos adecuado
        allowNull: false
      },
      Bloob: {
        type: DataTypes.BLOB // Cambia esto al tipo de datos adecuado
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Remitos');
  }
};
