import { DataTypes } from 'sequelize';
import sequelize from '../config.js';


const IVACompras = sequelize.define('IVACompras', {
  Id_Compras: {
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
    references: {
      model: 'Clientes',
      key: 'id_Cliente'
    },
    allowNull: true
  },
  Id_Proveedor: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Proveedor',
      key: 'id_Proveedor'
    },
    allowNull: true
  },
  CondicionIva: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Neto: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  IVA21: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  IVA10_5: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  PercIVA: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  IngrBrutosRetEfect: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  ConceptosNoAgravados: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  Flete10_5: {
    type: DataTypes.DECIMAL,
    allowNull: true
  },
  PercepcionesCba: {
    type: DataTypes.DECIMAL,
    allowNull: true
  },
  PercepcionesIIBB: {
    type: DataTypes.DECIMAL,
    allowNull: true
  },
  ImporteTotal: {
    type: DataTypes.DECIMAL,
    allowNull: false
  }
}, {
  tableName: 'IVACompras',
  timestamps: true
});

// Relación con Cliente (uno a muchos)
// IVACompras.belongsTo(Cliente, {
//   foreignKey: 'Id_Cliente',
//   targetKey: 'Id_Cliente'
// });

// // Relación con Proveedor (uno a muchos)
// IVACompras.belongsTo(Proveedor, {
//   foreignKey: 'Id_Proveedor',
//   targetKey: 'Id_Proveedor'
// });

export default IVACompras;
