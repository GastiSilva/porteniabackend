import { DataTypes } from 'sequelize';
import sequelize from '../config.js';
import Productos from './Producto.js';
import MateriaPrima from './MateriaPrima.js';

const MateriaPrimaPorProducto = sequelize.define('MateriaPrimaPorProducto', {
  id_MpxP: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_Producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Productos',
      key: 'Id_Producto'
    }
  },
  id_MateriaPrima: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'MateriaPrima',
      key: 'id_MateriaPrima'
    }
  },
  cantidadNecesaria: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: 'MateriaPrimaPorProducto',
  timestamps: false
});

// Asociaciones
MateriaPrimaPorProducto.belongsTo(Productos, {
  foreignKey: 'id_Producto',
  as: 'producto'
});

MateriaPrimaPorProducto.belongsTo(MateriaPrima, {
  foreignKey: 'id_MateriaPrima',
  as: 'materiaPrima'
});

export default MateriaPrimaPorProducto;
