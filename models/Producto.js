import { DataTypes } from 'sequelize';
import sequelize from '../config.js';

const Productos = sequelize.define('Productos', {
  Id_Producto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Codigo: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'Productos',
  timestamps: true
});


export default Productos;
