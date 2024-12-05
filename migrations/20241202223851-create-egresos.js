'use strict';
import { DataTypes } from 'sequelize';

export default {
  async up(queryInterface) {
    await queryInterface.createTable('Egresos', {
      Id_Egresos: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      Fecha: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      Concepto: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Comprobante: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ImporteTotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      Id_Proveedor: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Proveedores', // Nombre de la tabla Proveedores
          key: 'id_Proveedor', // Clave primaria de Proveedores
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      Id_Gastos: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Gastos', // Nombre de la tabla Gastos
          key: 'Id_Gastos', // Clave primaria de Gastos
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Egresos');
  },
};
