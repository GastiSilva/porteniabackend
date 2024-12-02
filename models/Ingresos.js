import { DataTypes } from 'sequelize';
import sequelize from '../config.js';

const Ingresos = sequelize.define('Ingresos', {
  Id_Ingreso: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  Nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Detalle: {
    type: DataTypes.STRING,
    allowNull: true
  },
  NComprobante: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  Total: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  Super: {
    type: DataTypes.DECIMAL,
    allowNull: true
  },
  Ventas_diarias_fabrica: {
    type: DataTypes.DECIMAL,
    allowNull: true
  },
  Ventas_miguel: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  Ventas_leonardo: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  Cheque: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  Efectivo: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  Transferencia: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  }
}, {
  tableName: 'Ingresos',
  timestamps: true
});

export default Ingresos;
