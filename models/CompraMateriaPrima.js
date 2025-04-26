import { DataTypes } from "sequelize";
import sequelize from "../config.js";

const CompraMateriaPrima = sequelize.define(
  "CompraMateriaPrima",
  {
    id_cmp: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Id_Compras: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_MateriaPrima: {
      type: DataTypes.INTEGER,
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
  },
  {
    tableName: "CompraMateriaPrima",
    timestamps: false,
  }
);

export default CompraMateriaPrima;
