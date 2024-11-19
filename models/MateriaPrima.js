import { DataTypes } from 'sequelize';
import sequelize from '../config.js';
import VentaMercaderia from './VentaMercaderia'; // Asegúrate de importar el modelo de VentaMercaderia
import Produccion from './Produccion'; // Asegúrate de importar el modelo de Produccion

const MateriaPrima = sequelize.define('MateriaPrima', {
  id_MateriaPrima: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  Marca: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  PrecioUnitario: {
    type: DataTypes.DECIMAL(10, 2), // Puedes ajustar la precisión según sea necesario
    allowNull: false
  },
  PrecioTotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  Id_VentaMercaderias: {
    type: DataTypes.INTEGER,
    references: {
      model: VentaMercaderia,
      key: 'Id_VentaMercaderia'
    },
    allowNull: false
  },
  id_Produccion: {
    type: DataTypes.INTEGER,
    references: {
      model: Produccion,
      key: 'id_Produccion'
    },
    allowNull: false
  }
}, {
  tableName: 'MateriaPrima',
  timestamps: true
});

// Relación con VentaMercaderia (uno a muchos)
MateriaPrima.belongsTo(VentaMercaderia, {
  foreignKey: 'Id_VentaMercaderias',
  targetKey: 'Id_VentaMercaderia'
});

// Relación con Produccion (uno a muchos)
MateriaPrima.belongsTo(Produccion, {
  foreignKey: 'id_Produccion',
  targetKey: 'id_Produccion'
});

export default MateriaPrima;
