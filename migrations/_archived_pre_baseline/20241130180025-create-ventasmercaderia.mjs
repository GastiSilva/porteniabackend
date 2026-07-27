import { DataTypes } from 'sequelize';

export default {
  async up(queryInterface) {
    await queryInterface.createTable('VentasMercaderia', {
      Id_VentaMercaderia: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_Producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Productos', // Nombre de la tabla referenciada
          key: 'Id_Producto', // Clave primaria de la tabla referenciada
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      Fecha: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      Cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('VentasMercaderia');
  }
};
