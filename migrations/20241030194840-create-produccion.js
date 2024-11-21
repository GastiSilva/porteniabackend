import { DataTypes } from 'sequelize';

export default {
  async up(queryInterface) {
    console.log("Ejecutando migración: createProduccion");
    await queryInterface.createTable('Produccion', {
      id_Produccion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Id_Producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Productos',  // nombre de la tabla referenciada
          key: 'Id_Producto',   // clave primaria de la tabla referenciada
        },
        onDelete: 'SET NULL', // comportamiento al eliminar un producto
        onUpdate: 'CASCADE', // comportamiento al actualizar un producto
      },
      Fecha: {
        type: DataTypes.DATE,
        allowNull: false
      },
      Cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Produccion');
  }
};
