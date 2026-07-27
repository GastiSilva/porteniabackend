'use strict';
import { DataTypes } from 'sequelize';

export default {
  async up(queryInterface) {
    await queryInterface.createTable('Compras', {
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
      Id_Proveedor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Proveedor', // ✅ Ahora apunta a la tabla correcta
          key: 'Id_Proveedor', // ✅ Coincide con el modelo
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      Id_MateriaPrima: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'MateriaPrima',
          key: 'Id_MateriaPrima',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      Id_Concepto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Conceptos',
          key: 'Id_Concepto',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      Cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      PrecioUnit: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Factura_N: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Importe: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Compras');
  },
};
