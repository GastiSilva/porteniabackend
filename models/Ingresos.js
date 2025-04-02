import { DataTypes } from 'sequelize';
import sequelize from '../config.js';
import Vendedor from './Vendedores.js'; 

const Ingresos = sequelize.define('Ingresos', {
  id_Ingreso: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  detalle: {
    type: DataTypes.STRING,
    allowNull: true
  },
  nComprobante: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  id_Vendedor: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Vendedor, 
      key: 'Id_Vendedor'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  cheque: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  efectivo: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  transferencia: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  }
}, {
  tableName: 'Ingresos',
  timestamps: false
});

// Relación con Vendedor
Ingresos.belongsTo(Vendedor, {
  foreignKey: 'id_Vendedor',
  targetKey: 'Id_Vendedor'
});

export default Ingresos;
