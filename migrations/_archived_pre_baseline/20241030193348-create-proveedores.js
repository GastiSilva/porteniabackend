import { DataTypes } from 'sequelize';

export default {
  async up(queryInterface) {
    await queryInterface.createTable('Proveedor', {
      id_Proveedor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Cuit: {
        type: DataTypes.STRING,
        allowNull: false
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Proveedor');
  }
};
