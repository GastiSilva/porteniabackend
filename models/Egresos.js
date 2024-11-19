import { DataTypes } from 'sequelize';
import sequelize from '../config.js';
import Proveedor from './Proveedor.js'; // Asegúrate de importar el modelo de Proveedor

const Egresos = sequelize.define('Egresos', {
  Id_Egresos: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  Concepto: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Comprobante: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ImporteTotal: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Compcon: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  Id_Proveedor: {
    type: DataTypes.INTEGER,
    references: {
      model: Proveedor,
      key: 'Id_Proveedor'
    },
    allowNull: true
  },
  Banco: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  Familia: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  Vehiculo: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  MantVehi: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  Impuestos: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  Servicios: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  Comision: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  Honorario: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  Sueldo: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  ProdFabrica: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  MantFabrica: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  GastosVarios: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'Egresos',
  timestamps: true
});

// Relación con Proveedor (uno a muchos)
Egresos.belongsTo(Proveedor, {
  foreignKey: 'id_Proveedor',
  targetKey: 'Id_Proveedor'
});

export default Egresos;
