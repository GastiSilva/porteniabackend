import { DataTypes } from 'sequelize';
import sequelize from '../config.js';
import Proveedor from './Proveedor.js'; // Asegúrate de importar el modelo de Proveedor

const Devolucion = sequelize.define('Devolucion', {
  id_Devolucion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_Producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_Proveedor: {
    type: DataTypes.INTEGER,
    references: {
      model: Proveedor,
      key: 'Id_Proveedor'
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
Devolucion.belongsTo(Proveedor, {
  foreignKey: 'id_Proveedor',
  targetKey: 'Id_Proveedor'
});

export default Devolucion;
