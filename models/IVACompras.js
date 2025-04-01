import { DataTypes } from 'sequelize';
import sequelize from '../config.js';
import Clientes from './Clientes.js';
import Proveedor from './Proveedor.js';

const IVACompras = sequelize.define('IVACompras', {
  Id_IvaCompras: {
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
    allowNull: false
  },
  PercIVA: {
    type: DataTypes.DECIMAL(10,2), // Cambio a DECIMAL
    allowNull: true
  },
  IngrBrutosRetEfect: {
    type: DataTypes.DECIMAL(10,2), // Cambio a DECIMAL
    allowNull: true
  },
  ConceptosNoAgravados: {
    type: DataTypes.DECIMAL(10,2), // Cambio a DECIMAL
    allowNull: true
  },
  Flete10_5: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: true
  },
  PercepcionesCba: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: true
  },
  PercepcionesIIBB: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: true
  },
  ImporteTotal: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  }
}, {
  tableName: 'IVACompras',
  timestamps: false
});


IVACompras.belongsTo(Clientes, {
  foreignKey: 'Id_Cliente',
  targetKey: 'id_Cliente'
});


IVACompras.belongsTo(Proveedor, {
  foreignKey: 'Id_Proveedor',
  targetKey: 'id_Proveedor'
});

export default IVACompras;
