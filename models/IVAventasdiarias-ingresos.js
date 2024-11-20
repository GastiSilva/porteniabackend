import { DataTypes } from 'sequelize';
import sequelize from '../config.js';

const Ingresos = sequelize.define('Ingresos', {
    Id_Ingresos: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    Nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Detalle: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Comprobante: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Total: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Id_Vendedor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Vendedores', // Tabla de vendedores
            key: 'Id_Vendedor',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    Cheque: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    Efectivo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    Transferencia: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    Pago: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    Debe: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    Cuanto: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Id_Estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Estados', // Tabla de estados
            key: 'Id_Estado',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
}, {
    tableName: 'Ingresos',
    timestamps: false,
});

export default Ingresos;
