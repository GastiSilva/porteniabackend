import { DataTypes } from 'sequelize';
import sequelize from '../config.js';
import Proveedor from './Proveedor.js'; // Asegúrate de importar el modelo de Proveedor

const Compras = sequelize.define('Compras', {
  Id_Compras: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  Id_Proveedor: {
    type: DataTypes.INTEGER,
    references: {
      model: Proveedor,
      key: 'Id_Proveedor'
    },
    allowNull: false
  },
  Mercaderias: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  PrecioUnit: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Factura_N: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Importe: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Estado: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  tableName: 'Compras',
  timestamps: true
});

// Relación con Proveedor (uno a muchos)
Compras.belongsTo(Proveedor, {
  foreignKey: 'id_Proveedor',
  targetKey: 'Id_Proveedor'
});

export default Compras;
