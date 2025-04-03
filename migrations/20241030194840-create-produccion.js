import { DataTypes } from "sequelize";

export default {
  async up(queryInterface) {
    await queryInterface.createTable(
      "Produccion",
      {
        id_Produccion: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        Id_Producto: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "Productos", 
            key: "Id_Producto",
          },
          onDelete: "CASCADE", 
          onUpdate: "CASCADE",
        },
        Fecha: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        Cantidad: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        timestamps: false, 
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Produccion");
  },
};
