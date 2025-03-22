import { DataTypes } from "sequelize";
import sequelize from "../config.js";
import Estado from "./Estados.js";

const Remito = sequelize.define(
  "Remito",
  {
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
      defaultValue: 1,
      references: {
        model: Estado,
        key: "Id_Estado",
      },
    },
    remitoPDF: {
      type: DataTypes.BLOB("long"), // Guarda el archivo PDF en la base de datos
      allowNull: true,
    },
  },
  {
    tableName: "Remito",
    timestamps: false,
  }
);

// Relación con Estado
Remito.belongsTo(Estado, { foreignKey: "Id_Estado", as: "Estado" });

export default Remito;
