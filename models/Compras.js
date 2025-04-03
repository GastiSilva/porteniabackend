import { DataTypes } from "sequelize";
import sequelize from "../config.js";
import MateriaPrima from "./MateriaPrima.js";
import Estado from "./Estados.js"; 

const Compras = sequelize.define(
  "Compras",
  {
    Id_Compras: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    id_MateriaPrima: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: MateriaPrima,
        key: "id_MateriaPrima",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    Id_Estado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: Estado,
        key: "Id_Estado",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL", 
    },
    Cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    PrecioUnit: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    Factura_N: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Importe: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "Compras",
    timestamps: false,
  }
);

// Definiendo las relaciones correctamente
Compras.belongsTo(MateriaPrima, { foreignKey: "id_MateriaPrima" });
Compras.belongsTo(Estado, { foreignKey: "Id_Estado" }); 

export default Compras;
