import { DataTypes } from 'sequelize';
import sequelize from '../config.js';

const Produccion = sequelize.define('Produccion', {
  id_Produccion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_Producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  Cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'Produccion',
  timestamps: true
});

export default Produccion;
