import { DataTypes } from 'sequelize';
import sequelize from '../config.js';

const Vendedor = sequelize.define('Vendedor', {
  Id_Vendedor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Cuit: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  }
}, {
  tableName: 'Vendedores',
  timestamps: false,
});

export default Vendedor;
