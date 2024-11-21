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
    references: {
      model: 'Productos', // Nombre de la tabla referenciada
      key: 'Id_Producto', // Nombre de la columna referenciada
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
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
