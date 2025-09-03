import { DataTypes } from 'sequelize';
import sequelize from '../config.js';
import Clientes from './Clientes.js';
import Proveedor from './Proveedor.js';

const IVAVentas = sequelize.define('IVAVentas', {
  Id_IvaVentas: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  Factura: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Factura_N: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Id_Cliente: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Clientes,
      key: 'id_Cliente'
    }
  },
  Id_Proveedor: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Proveedor, 
      key: 'id_Proveedor'
    }
  },
  CondicionIva: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Neto: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  },
  IVA21: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  },
  IVA10_5: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: true
  },
  Retenciones: {
    type: DataTypes.DECIMAL(10,2), 
    allowNull: true
  },
  ImporteTotal: {
    type: DataTypes.DECIMAL(10,2), 
    allowNull: false
  }
}, {
  tableName: 'IVAVentas',
  timestamps: false
});


IVAVentas.belongsTo(Clientes, {
  foreignKey: 'Id_Cliente',
  targetKey: 'id_Cliente'
});


IVAVentas.belongsTo(Proveedor, {
  foreignKey: 'Id_Proveedor',
  targetKey: 'id_Proveedor'
});

export default IVAVentas;
