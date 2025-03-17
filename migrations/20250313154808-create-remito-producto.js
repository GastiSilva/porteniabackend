import { DataTypes } from "sequelize";

export default {
  up: async (queryInterface) => {
    await queryInterface.createTable("RemitoProducto", {
      Id_RemitoProducto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Id_Remito: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Remito",
          key: "Id_Remito",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      Id_Producto: {
        type: DataTypes.INTEGER,
        allowNull: false, // Ahora es obligatorio
        references: {
          model: "Producto",
          key: "Id_Producto",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      Cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      PrecioUnit: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      PrecioTotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("RemitoProducto");
  },
};
