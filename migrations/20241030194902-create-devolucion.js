'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Devolucion', {
      id_Devolucion: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
        type: Sequelize.DATE,
        allowNull: false
      },
      Cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Devolucion');
  }
};
