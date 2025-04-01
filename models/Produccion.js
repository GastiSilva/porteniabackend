import { DataTypes } from "sequelize";
import sequelize from "../config.js";
import Producto from "./Producto.js";

const Produccion = sequelize.define(
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
        model: Producto, 
        key: "Id_Producto",
      },
      field: "id_Producto",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
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
    tableName: "Produccion",
    timestamps: false,
  }
);

// **Definir la relación correctamente**
Produccion.belongsTo(Producto, { foreignKey: "Id_Producto", as: "Producto" });

export default Produccion;
