'use strict';
import { DataTypes } from 'sequelize';

export default {
  async up(queryInterface) {
    await queryInterface.createTable('IVACompras', {
      Id_Compras: {
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
        allowNull: true,
        references: {
          model: 'Clientes', // Tabla de clientes
          key: 'id_Cliente', // Clave primaria de la tabla referenciada
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      Id_Proveedor: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Proveedor', // Tabla de proveedores
          key: 'id_Proveedor', // Clave primaria de la tabla referenciada
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      CondicionIva: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Neto: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      IVA21: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      IVA10_5: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      PercIVA: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      IngrBrutosRetEfect: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ConceptosNoAgravados: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      Flete10_5: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      PercepcionesCba: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      PercepcionesIIBB: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      ImporteTotal: {
        type: DataTypes.DECIMAL,
        allowNull: false,
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
    await queryInterface.dropTable('IVACompras');
  },
};
