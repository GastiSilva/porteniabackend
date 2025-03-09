import { DataTypes } from 'sequelize';
import sequelize from '../config.js';

const Devolucion = sequelize.define('Devolucion', {
  id_Devolucion: {
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
  id_Proveedor: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Proveedor',
      key: 'id_Proveedor'
    },
    allowNull: false
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
  tableName: 'Devolucion',
  timestamps: true
});

// Relación con Proveedor (uno a muchos)
// Devolucion.belongsTo(Proveedor, {
//   foreignKey: 'id_Proveedor',
//   targetKey: 'Id_Proveedor'
// });

export default Devolucion;
