import { DataTypes } from "sequelize";
import sequelize from "../config.js";
import Proveedor from "./Proveedor.js";
import MateriaPrima from "./MateriaPrima.js";
import Conceptos from "./Concepto.js";

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
    id_Proveedor: {  // Cambié 'Id_Proveedor' a 'id_Proveedor' en minúsculas
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_MateriaPrima: {  // Cambié 'Id_MateriaPrima' a 'id_MateriaPrima' en minúsculas
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_Concepto: {  // Cambié 'Id_Concepto' a 'id_Concepto' en minúsculas
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    PrecioUnit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Factura_N: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Importe: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: "Compras",
    timestamps: false,
  }
);

// Relación belongsTo asegurando que las claves foráneas coinciden con las primarias
Compras.belongsTo(Proveedor, { foreignKey: "id_Proveedor" });
Compras.belongsTo(MateriaPrima, { foreignKey: "id_MateriaPrima" });
Compras.belongsTo(Conceptos, { foreignKey: "id_Concepto" });

export default Compras;
