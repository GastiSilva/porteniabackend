import sequelize from '../config.js';

export const obtenerEstructuraCompras = async (req, res) => {
    try {
        // Consulta para obtener la estructura de la tabla Compras
        const estructuraComprasQuery = `
            SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name = 'Compras' 
            AND table_schema = 'public'
            AND (column_name = 'Id_Compras' OR column_name NOT LIKE 'id%')
            AND column_name NOT IN ('Id_Proveedor', 'Id_MateriaPrima', 'Id_Concepto');
        `;
        const [estructuraCompras] = await sequelize.query(estructuraComprasQuery);

        // Consulta para obtener la estructura de la tabla Proveedor
        const estructuraProveedorQuery = `
            SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name = 'Proveedor' 
            AND table_schema = 'public'
            AND column_name NOT IN ('id_Proveedor');
        `;
        const [estructuraProveedor] = await sequelize.query(estructuraProveedorQuery);

        // Consulta para obtener la estructura de la tabla MateriaPrima
        const estructuraMateriaPrimaQuery = `
            SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name = 'MateriaPrima' AND table_schema = 'public'
            AND column_name NOT IN ('Id_VentaMercaderia', 'id_Produccion', 'id_MateriaPrima');
        `;
        const [estructuraMateriaPrima] = await sequelize.query(estructuraMateriaPrimaQuery);

        // Consulta para obtener la estructura de la tabla Conceptos
        const estructuraConceptosQuery = `
            SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name = 'Conceptos' 
            AND table_schema = 'public'
            
            AND column_name NOT IN ('id_Concepto');
        `;
        const [estructuraConceptos] = await sequelize.query(estructuraConceptosQuery);

        // Enviar las estructuras al frontend
        res.status(200).json({
            Compras: estructuraCompras,
            Proveedor: estructuraProveedor,
            MateriaPrima: estructuraMateriaPrima,
            Conceptos: estructuraConceptos,
        });
    } catch (error) {
        console.error('Error al obtener la estructura de las tablas:', error);
        res.status(500).json({ error: 'Error al obtener la estructura de las tablas', details: error.message });
    }
};