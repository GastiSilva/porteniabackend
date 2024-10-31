import { DataTypes } from 'sequelize';
import sequelize from './database.js';

const Rubro = sequelize.define('Rubro', {
  Id_Rubro: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Rubro: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'Rubros',
  timestamps: false,
});

export default Rubro;
