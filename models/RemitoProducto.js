import { DataTypes } from "sequelize";
import sequelize from "../config.js";
import Remito from "./Remito.js";
import Producto from "./Producto.js";

const RemitoProducto = sequelize.define(
  "RemitoProducto",
  {
    Id_RemitoProducto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Id_Remito: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Remito,
        key: "Id_Remito",
      },
    },
    Id_Producto: {
      type: DataTypes.INTEGER,
      allowNull: false, // Ahora siempre debe ser un producto existente
      references: {
        model: Producto,
        key: "Id_Producto",
      },
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
  },
  {
    tableName: "RemitoProducto",
    timestamps: false,
  }
);

// Relaciones
RemitoProducto.belongsTo(Remito, { foreignKey: "Id_Remito" });
RemitoProducto.belongsTo(Producto, { foreignKey: "Id_Producto"});

export default RemitoProducto;
