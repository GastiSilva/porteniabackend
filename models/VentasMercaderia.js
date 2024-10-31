import { DataTypes } from 'sequelize';
import sequelize from '../config.js';

const VentaMercaderia = sequelize.define('VentasMercaderia', {
  Id_VentaMercaderia: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_Producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
  tableName: 'VentasMercaderia',
  timestamps: true
});



export default VentaMercaderia;
