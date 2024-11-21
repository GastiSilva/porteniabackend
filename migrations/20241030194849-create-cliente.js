import { DataTypes } from 'sequelize';

export default {
  async up(queryInterface) {
    await queryInterface.createTable('Clientes', {
      id_Cliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      Nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Cuil: {
        type: DataTypes.STRING,
        allowNull: false
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Clientes');
  }
};
