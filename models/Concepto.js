import { DataTypes } from 'sequelize';
import sequelize from '../config.js'; // Asegúrate de importar tu instancia de Sequelize

const Conceptos = sequelize.define('Conceptos', {
    id_Concepto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Concepto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
}, {
    tableName: 'Conceptos',
    timestamps: false,
});

export default Conceptos;
