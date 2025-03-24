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
          model: 'Proveedor', // Asegúrate de que coincide con tu modelo
          key: 'Id_Proveedor', // Revisa que sea exactamente este nombre
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      Id_Gastos: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Gastos', // Verifica que el modelo también coincida
          key: 'Id_Gastos',
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
