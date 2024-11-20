import { DataTypes } from 'sequelize';

export default {
  async up(queryInterface) {
    await queryInterface.createTable('MateriaPrima', {
      id_MateriaPrima: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Fecha: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      Marca: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      PrecioUnitario: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      PrecioTotal: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Id_VentaMercaderias: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'VentasMercaderia',
          key: 'Id_VentaMercaderia',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      id_Produccion: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Produccion',
          key: 'id_Produccion',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('MateriaPrima');
  }
};
