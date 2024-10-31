'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Solicitantes', {
      id_Solicitud: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Apellido: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Telefono: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      Descripcion: {
        type: Sequelize.STRING,
        allowNull: true
      },
      Archivo: {
        type: Sequelize.BLOB,
        allowNull: true
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
    await queryInterface.dropTable('Solicitantes');
  }
};
