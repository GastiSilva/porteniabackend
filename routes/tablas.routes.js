import { Router } from "express";
import sequelize from "../config.js";

const router = Router();

router.get('/tablasTodas', async (req, res) => {
    try {
        const query = "SELECT tablename as table_name FROM pg_catalog.pg_tables WHERE schemaname = 'public'";

        const [result] = await sequelize.query(query);
        const filteredResult = result.filter(table => !['Conceptos', 'Estados', 'Remito', 'RemitoProducto'].includes(table.table_name));

        res.json(filteredResult);
    } catch (error) {
        console.error("Error al obtener las tablas:", error);
        res.status(500).json({ error: "Error al obtener las tablas" });
    }
});


router.get('/tablasExcell', async (req, res) => {
    try {
        const query = "SELECT tablename as table_name FROM pg_catalog.pg_tables WHERE schemaname = 'public'";

        const [result] = await sequelize.query(query);
        const filteredResult = result.filter(table => !['Usuarios', 'Conceptos', 'Estados',
            'Proveedor', 'Remito', 'RemitoProducto'].includes(table.table_name));
        res.json(filteredResult);
    } catch (error) {
        console.error("Error al obtener las tablas:", error);
        res.status(500).json({ error: "Error al obtener las tablas" });
    }
});


//METODO PARA LAS TABLAS
router.get('/datosTablas/:tableName', async (req, res) => {
    const { tableName } = req.params;
    try {
        // Consulta las columnas y detecta claves foráneas
        const fkQuery = `
            SELECT 
                kcu.column_name, 
                ccu.table_name AS foreign_table,
                ccu.column_name AS foreign_column
            FROM information_schema.table_constraints AS tc
            JOIN information_schema.key_column_usage AS kcu
                ON tc.constraint_name = kcu.constraint_name
                AND tc.table_name = kcu.table_name
            JOIN information_schema.constraint_column_usage AS ccu
                ON ccu.constraint_name = tc.constraint_name
            WHERE tc.constraint_type = 'FOREIGN KEY'
                AND tc.table_name = '${tableName}'
                AND tc.table_schema = 'public';
        `;
        const [foreignKeys] = await sequelize.query(fkQuery);


        // Consulta para obtener los datos de la tabla principal
        const query = `SELECT * FROM "public"."${tableName}"`;
        const [result] = await sequelize.query(query);

        if (result.length === 0) {
            // Si la tabla está vacía, obtener las columnas
            const columnQuery = `
                SELECT column_name 
                FROM information_schema.columns 
                WHERE table_name = '${tableName}' AND table_schema = 'public';
            `;
            const [columns] = await sequelize.query(columnQuery);
            const columnNames = columns.map(col => col.column_name);
            return res.json({ columns: columnNames });
        }




        // Obtener los datos de las tablas referenciadas
        const foreignData = {};
        for (const fk of foreignKeys) {
            const foreignQuery = `SELECT * FROM "public"."${fk.foreign_table}"`;
            const [foreignRows] = await sequelize.query(foreignQuery);
            foreignData[fk.column_name] = foreignRows;
        }





        // Formatear el resultado
        const resultadoFormateado = result.map(row => {
            const filaProcesada = { ...row };

            // Reemplazar ID de claves foráneas por datos completos y aplanarlos
            for (const fk of foreignKeys) {
                const fkColumn = fk.column_name;
                const relatedTableData = foreignData[fkColumn];

                if (row[fkColumn]) {
                    const filaRelacionada = relatedTableData.find(
                        related => related[fk.foreign_column] === row[fkColumn]
                    );

                    if (filaRelacionada) {
                        // Aplanar solo columnas no clave foránea
                        Object.keys(filaRelacionada).forEach(key => {
                            if (!key.toLowerCase().startsWith('id')) {
                                filaProcesada[key] = filaRelacionada[key];
                            }
                        });
                        // Eliminar la clave foránea original
                        delete filaProcesada[fkColumn];
                    }
                }
            }

            // Formatear fecha si existe
            if (filaProcesada.Fecha) {
                const date = new Date(filaProcesada.Fecha);
                filaProcesada.Fecha = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
            }
            if (filaProcesada.fecha) {
                const date = new Date(filaProcesada.fecha);
                filaProcesada.fecha = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
            }

            return filaProcesada;
        });

        res.json(resultadoFormateado);
    } catch (error) {
        console.error("Error al obtener los datos de la tabla:", error);
        res.status(500).json({ error: "Error al obtener los datos de la tabla" });
    }
});


//METODO PARA EL FORMS
router.get('/datosTablasForms/:tableName', async (req, res) => {
    const { tableName } = req.params;
    try {
        // Consulta las columnas y detecta claves foráneas
        const fkQuery = `
            SELECT 
                kcu.column_name, 
                ccu.table_name AS foreign_table,
                ccu.column_name AS foreign_column
            FROM information_schema.table_constraints AS tc
            JOIN information_schema.key_column_usage AS kcu
                ON tc.constraint_name = kcu.constraint_name
                AND tc.table_name = kcu.table_name
            JOIN information_schema.constraint_column_usage AS ccu
                ON ccu.constraint_name = tc.constraint_name
            WHERE tc.constraint_type = 'FOREIGN KEY'
                AND tc.table_name = '${tableName}'
                AND tc.table_schema = 'public';
        `;

        const [foreignKeys] = await sequelize.query(fkQuery);

        // Consulta para obtener los nombres de las columnas de la tabla principal
        const columnQuery = `
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = '${tableName}' AND table_schema = 'public';
        `;
        const [columns] = await sequelize.query(columnQuery);
        const columnNames = columns.map(col => col.column_name);

        // Si hay claves foráneas, obtener los nombres de las columnas de las tablas referenciadas
        const foreignColumns = {};
        for (const fk of foreignKeys) {
            const foreignColumnQuery = `
                SELECT column_name 
                FROM information_schema.columns 
                WHERE table_name = '${fk.foreign_table}' AND table_schema = 'public';
            `;
            const [foreignCols] = await sequelize.query(foreignColumnQuery);
            foreignColumns[fk.column_name] = foreignCols.map(col => col.column_name);
        }

        res.json({ columns: columnNames, foreignColumns });
    } catch (error) {
        console.error("Error al obtener los datos de la tabla:", error);
        res.status(500).json({ error: "Error al obtener los datos de la tabla" });
    }
});



export default router;
