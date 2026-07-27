'use strict';
import { DataTypes } from 'sequelize';


export default {
  async up(queryInterface) {
    await queryInterface.createTable('IvaVentas', {
      Id_IvaVentas: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      Fecha: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      Factura: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Factura_N: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Id_Cliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Clientes', // Nombre de la tabla referenciada
          key: 'id_Cliente', // Clave primaria de la tabla referenciada
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      Id_Proveedor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Proveedor', // Nombre de la tabla referenciada
          key: 'id_Proveedor', // Clave primaria de la tabla referenciada
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      CondiccionIva: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Neto: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Id_Consepto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Conceptos',
          key: 'id_Concepto',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      Retenciones: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ImporteTotal: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('IvaVentas');
  },
};
