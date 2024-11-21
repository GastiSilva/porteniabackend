import { DataTypes } from 'sequelize';
import sequelize from '../config.js';

const Solicitantes = sequelize.define('Solicitantes', {
  id_Solicitud: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Apellido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Telefono: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Descripcion: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Archivo: {
    type: DataTypes.BLOB,
    allowNull: true
  }
}, {
  tableName: 'Solicitantes',
  timestamps: false
});

export default Solicitantes;
