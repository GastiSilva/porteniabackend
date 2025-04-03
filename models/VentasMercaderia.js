import { DataTypes } from 'sequelize';
import sequelize from '../config.js';
import Producto from './Producto.js'; 

const VentaMercaderia = sequelize.define('VentaMercaderia', {
  Id_VentaMercaderia: {
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
  tableName: 'VentasMercaderia',
  timestamps: false,
});

VentaMercaderia.belongsTo(Producto, {
  foreignKey: 'id_Producto', 
  targetKey: 'Id_Producto', 
});

export default VentaMercaderia;
