'use strict';

import { DataTypes } from 'sequelize';

export default {
  async up(queryInterface) {
    console.log("Ejecutando migración: createVentasMercaderia");
    await queryInterface.createTable('VentasMercaderia', {
      Id_VentaMercaderia: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_Producto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Productos',  // nombre de la tabla referenciada
          key: 'Id_Producto',   // clave primaria de la tabla referenciada
        },
        onDelete: 'CASCADE', // comportamiento al eliminar un producto
        onUpdate: 'CASCADE', // comportamiento al actualizar un producto
      },
      Fecha: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      Cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('VentasMercaderia');
  }
};
