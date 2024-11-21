import { DataTypes } from 'sequelize';
import sequelize from '../config.js';

const Cliente = sequelize.define('Clientes', {
  id_Cliente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Cuil: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'Clientes',
  timestamps: false
});

export default Cliente;
