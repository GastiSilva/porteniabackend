import { DataTypes } from "sequelize";
import sequelize from "../config.js";
import Estado from "./Estados.js";
import CompraMateriaPrima from "./CompraMateriaPrima.js";
import MateriaPrima from "./MateriaPrima.js";

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
    Factura_N: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Importe: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    Marca: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    IVA21: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    IVA10_5: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    PercepcionIVA: {
      type: DataTypes.DECIMAL(10,2), // Cambio a DECIMAL
      allowNull: true
    },
    PercepcionesMuniCba: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    Flete: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
  },
  {
    tableName: "Compras",
    timestamps: false,
  }
);


Compras.belongsTo(Estado, { foreignKey: "Id_Estado" });

Compras.belongsToMany(MateriaPrima, {
  through: CompraMateriaPrima,
  foreignKey: "Id_Compras",
});

MateriaPrima.belongsToMany(Compras, {
  through: CompraMateriaPrima,
  foreignKey: "id_MateriaPrima",
});

export default Compras;
