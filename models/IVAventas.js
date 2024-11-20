import { DataTypes } from 'sequelize';
import sequelize from '../config.js';

const IvaVentas = sequelize.define('IvaVentas', {
    Id_IvaVentas: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    Factura: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Factura_N: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Id_Cliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Clientes', // Tabla de clientes
            key: 'id_Cliente',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    Id_Proveedor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Proveedor', // Tabla de proveedores
            key: 'id_Proveedor',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    CondiccionIva: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Neto: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Id_Consepto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Conceptos', // Tabla de conceptos
            key: 'id_Concepto',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    Retenciones: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    ImporteTotal: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'IvaVentas',
    timestamps: false,
});

export default IvaVentas;
