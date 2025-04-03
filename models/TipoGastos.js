import { DataTypes } from 'sequelize';
import sequelize from '../config.js';
import Gastos from './Gastos.js';

const TipoGastos = sequelize.define('Tipo Gastos', {
  Id_TipoGastos: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Tipo_Gasto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'TipoGastos',
  timestamps: false,
});


export default TipoGastos;