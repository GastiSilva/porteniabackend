// models/Remito.js
import { DataTypes } from 'sequelize';
import sequelize from '../config.js';

const Remito = sequelize.define('Remito', {
  Id_Remito: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Id_Producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Numero: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Precio: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Total: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Subtotal: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Id_Estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Modelo: {
    type: DataTypes.BLOB // Cambia esto al tipo de datos adecuado 
  }
}, {
  tableName: 'Remitos',
  timestamps: true
});

export default Remito;
