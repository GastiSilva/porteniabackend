import { DataTypes } from 'sequelize';
import sequelize from '../config.js';
import Proveedor from './Proveedor.js';
import Producto from './Producto.js';
import Estado from './Estados.js';

const Remito = sequelize.define('Remito', {
  Id_Remito: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Id_Proveedor: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Proveedor,
      key: 'Id_Proveedor'
    }
  },
  Id_Producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Producto,
      key: 'Id_Producto'
    }
  },
  Numero: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  PrecioUnit: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  Cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Total: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  Subtotal: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  Id_Estado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    references: {
      model: Estado,
      key: 'Id_Estado'
    }
  },
  Modelo: {
    type: DataTypes.BLOB,
    allowNull: true
  }
}, {
  tableName: 'Remito',
  timestamps: true
});

// Definir relaciones
Remito.belongsTo(Proveedor, { foreignKey: 'Id_Proveedor', as: 'Proveedor' });
Remito.belongsTo(Producto, { foreignKey: 'Id_Producto', as: 'Producto' });
Remito.belongsTo(Estado, { foreignKey: 'Id_Estado', as: 'Estado' });

export default Remito;
