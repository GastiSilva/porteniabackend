import { DataTypes } from 'sequelize';
import sequelize from '../config.js';
import Vendedores from './Vendedores.js';

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
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  Id_Vendedor: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Vendedores',
      key: 'Id_Vendedor'
    }
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
  timestamps: false
});

// Definir la relación con Vendedores
Ingresos.belongsTo(Vendedores, {
  foreignKey: 'Id_Vendedor',
  targetKey: 'Id_Vendedor'
});

export default Ingresos;
