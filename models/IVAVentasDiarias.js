import { DataTypes } from 'sequelize';
import sequelize from '../config.js';
import Vendedor from './Vendedor.js';
import Estado from './Estado.js';

const IVAVentasDiarias = sequelize.define('IVAVentasDiarias', {
  Id_IVAVentasDiarias: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  Nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Detalle: {
    type: DataTypes.STRING,
    allowNull: true
  },
  NComprobante: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Total: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  Id_Vendedor: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Vendedor,
      key: 'Id_Vendedor'
    }
  },
  Cheque: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  Efectivo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  Transferencia: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  Pago: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  Debe: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  Cuanto: {
    type: DataTypes.DECIMAL,
    allowNull: true
  },
  Id_Estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Estado,
      key: 'Id_Estado'
    }
  }
}, {
  tableName: 'IVAVentasDiarias',
  timestamps: true
});

// Definir relaciones
IVAVentasDiarias.belongsTo(Vendedor, { foreignKey: 'Id_Vendedor', as: 'Vendedor' });
IVAVentasDiarias.belongsTo(Estado, { foreignKey: 'Id_Estado', as: 'Estado' });

export default IVAVentasDiarias;
