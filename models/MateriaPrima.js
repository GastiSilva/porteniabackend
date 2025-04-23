import { DataTypes } from "sequelize";
import sequelize from "../config.js";

const MateriaPrima = sequelize.define(
  "MateriaPrima",
  {
    id_MateriaPrima: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "MateriaPrima",
    timestamps: false,
  }
);

export default MateriaPrima;
