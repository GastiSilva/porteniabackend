import { DataTypes } from 'sequelize';
import sequelize from '../config.js';

const Usuario = sequelize.define('Usuarios', {
  id_Usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Usuario: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Contrasenia: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'Usuarios',
  timestamps: false
});


export default Usuario;
