import { DataTypes } from 'sequelize';

export default {
  async up(queryInterface) {
    await queryInterface.createTable('Solicitantes', {
      id_Solicitud: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Apellido: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Telefono: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      Descripcion: {
        type: DataTypes.STRING,
        allowNull: true
      },
      Archivo: {
        type: DataTypes.BLOB,
        allowNull: false
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Solicitantes');
  }
};
