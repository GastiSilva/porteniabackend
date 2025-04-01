import { DataTypes } from 'sequelize';
import sequelize from '../config.js';
import VentasMercaderia from './VentasMercaderia.js';  // Asegúrate de importar el modelo correcto
import Produccion from './Produccion.js';            // Asegúrate de importar el modelo correcto

const MateriaPrima = sequelize.define('MateriaPrima', {
  id_MateriaPrima: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  Marca: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  PrecioUnitario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  PrecioTotal: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Id_VentaMercaderia: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'VentasMercaderia',
      key: 'Id_VentaMercaderia',
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  },
  id_Produccion: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Produccion',
      key: 'id_Produccion',
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  },
}, {
  tableName: 'MateriaPrima',
  timestamps: false,
});

// // Relaciones (belongsTo)
MateriaPrima.belongsTo(VentasMercaderia, { foreignKey: 'Id_VentaMercaderia' });
MateriaPrima.belongsTo(Produccion, { foreignKey: 'id_Produccion' });

export default MateriaPrima;
