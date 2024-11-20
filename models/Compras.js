import { DataTypes } from 'sequelize';
import sequelize from '../config.js';

const Compras = sequelize.define('Compras', {
    Id_Compras: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    Id_Proveedor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Proveedor',
            key: 'id_Proveedor',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    Id_MateriaPrima: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'MateriaPrima',
            key: 'id_MateriaPrima',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    Id_Concepto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Conceptos',
            key: 'id_Concepto',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    Cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    PrecioUnit: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Factura_N: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Importe: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    tableName: 'Compras',
    timestamps: false,
});

export default Compras;
