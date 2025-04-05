import { DataTypes } from 'sequelize';
import sequelize from '../config.js';
import TipoGastos from './TipoGastos.js';

const Gastos = sequelize.define('Gastos', {
  Id_Gastos: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Id_TipoGastos: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: TipoGastos,
      key: 'Id_TipoGastos',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  Id_Egresos: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Egresos',
      key: 'Id_Egresos',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
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
