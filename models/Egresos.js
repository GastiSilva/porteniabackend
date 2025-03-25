import { DataTypes } from 'sequelize';
import sequelize from '../config.js';
import Proveedor from './Proveedor.js';
import Gastos from './Gastos.js';

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
    type: DataTypes.STRING,
    allowNull: false
  },
  ImporteTotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  Id_Proveedor: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Proveedor',
      key: 'id_Proveedor'
    },
    allowNull: true
  },
  Id_Gastos: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Gastos',
      key: 'Id_Gastos'
    },
    allowNull: true
  }

}, {
  tableName: 'Egresos',
  timestamps: false
});

Egresos.belongsTo(Proveedor, {
  foreignKey: 'Id_Proveedor',
  targetKey: 'id_Proveedor' // Asegúrate de usar el nombre correcto del campo
});

Egresos.belongsTo(Gastos, {
  foreignKey: 'Id_Gastos',
  targetKey: 'Id_Gastos'
});


export default Egresos;
