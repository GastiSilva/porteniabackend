import { DataTypes } from 'sequelize';
import sequelize from '../config.js';

const Estado = sequelize.define('Estado', {
  Id_Estado: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Estado: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'Estados',
  timestamps: false,
});

export default Estado;
