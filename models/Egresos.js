import { DataTypes } from 'sequelize';
import sequelize from '../config.js';

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
  // Codigo: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false
  // },
  Comprobante: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ImporteTotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'Egresos',
  timestamps: false
});

export default Egresos;
