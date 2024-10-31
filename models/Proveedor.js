import { DataTypes } from 'sequelize';
import sequelize from '../config.js';

const Proveedor = sequelize.define('Proveedor', {
  id_Proveedor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Cuit: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'Proveedor',
  timestamps: true
});

export default Proveedor;
