import { DataTypes } from 'sequelize';
import sequelize from '../config.js';


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
    references: {
      model: 'Clientes',
      key: 'id_Cliente'
    },
    allowNull: false
  },
  Id_Proveedor: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Proveedor',
      key: 'Id_Proveedor'
    },
    allowNull: false
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
    type: DataTypes.DECIMAL(10, 2), // Puedes ajustar la precisión si es necesario
    allowNull: false
  },
  IVA10_5: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  Retenciones: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ImporteTotal: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'IVAVentas',
  timestamps: true
});

// Relación con Cliente (uno a muchos)
// IVAVentas.belongsTo(Cliente, {
//   foreignKey: 'id_Cliente',
//   targetKey: 'Id_Cliente'
// });

// // Relación con Proveedor (uno a muchos)
// IVAVentas.belongsTo(Proveedor, {
//   foreignKey: 'id_Proveedor',
//   targetKey: 'Id_Proveedor'
// });

export default IVAVentas;
