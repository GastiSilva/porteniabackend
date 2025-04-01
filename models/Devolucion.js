import { DataTypes } from 'sequelize';
import sequelize from '../config.js';
import Producto from './Producto.js';

const Devolucion = sequelize.define('Devolucion', {
  id_Devolucion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_Producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Productos', 
      key: 'Id_Producto', 
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  Fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  Cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'Devolucion',
  timestamps: false, 
});

// Relación con Producto
Devolucion.belongsTo(Producto, {
  foreignKey: 'id_Producto', // Clave foránea en Devolucion
  targetKey: 'Id_Producto',  // Clave primaria de Producto
});

export default Devolucion;
