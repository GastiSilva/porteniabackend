import { DataTypes } from 'sequelize';
import sequelize from '../config.js';
import Vendedor from './Vendedores.js'; 
import Estado from './Estados.js';

const Ingresos = sequelize.define('Ingresos', {
  id_Ingreso: {
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
  NroComprobante: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  Total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  Id_Vendedor: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Vendedor, 
      key: 'Id_Vendedor'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  Id_Estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    references: {
      model: Estado,
      key: "Id_Estado",
    },
  },
  Cheque: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  Efectivo: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  Transferencia: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  }
}, {
  tableName: 'Ingresos',
  timestamps: false
});

// Relación con Vendedor
Ingresos.belongsTo(Vendedor, {
  foreignKey: 'id_Vendedor',
  targetKey: 'Id_Vendedor'
});

Ingresos.belongsTo(Estado, { foreignKey: "Id_Estado", targetKey: "Id_Estado" });

export default Ingresos;
