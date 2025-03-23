import { DataTypes } from "sequelize";

export default {
  up: async (queryInterface) => {
    await queryInterface.createTable("Remitos", {
      Id_Remito: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Senior: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Domicilio: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      Id_Estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Estados", // Asegúrate de que la tabla Estados ya exista
          key: "Id_Estado",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      remitoPDF: {
        type: DataTypes.BLOB("long"), // Guarda el PDF en la base de datos
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("Remitos");
  },
};
