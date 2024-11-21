import { DataTypes } from 'sequelize';
import sequelize from '../config.js';

const Gastos = sequelize.define('Gastos', {
  Id_Gastos: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Gastos: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Importe: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  }  
}, {
  tableName: 'Gastos',
  timestamps: false,
});

export default Gastos;