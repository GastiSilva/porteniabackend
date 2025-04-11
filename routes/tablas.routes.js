import { Router } from "express";
import sequelize from "../config.js";
import dayjs from 'dayjs';

const router = Router();

router.get('/tablasTodas', async (req, res) => {
    try {
        const query = "SELECT tablename as table_name FROM pg_catalog.pg_tables WHERE schemaname = 'public'";

        const [result] = await sequelize.query(query);
        const filteredResult = result.filter(table => !['Conceptos', 'Estados', 'Remito', 'RemitoProducto', 'TipoGastos', 'Productos'].includes(table.table_name));

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
        const filteredResult = result.filter(table => !['Usuarios', 'Conceptos', 'Estados', 'Gastos', 'IVACompras', 'IVAVentas',
            'MateriaPrima', 'TipoGastos', 'Vendedores', 'Proveedor', 'Remito', 'RemitoProducto'].includes(table.table_name));
        res.json(filteredResult);
    } catch (error) {
        console.error("Error al obtener las tablas:", error);
        res.status(500).json({ error: "Error al obtener las tablas" });
    }
});


//METODO PARA LAS TABLAS
router.get('/datosTablas/:tableName', async (req, res) => {
    const { tableName } = req.params;
    const { fechaDesde, fechaHasta } = req.query;
    try {
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

        // Verificar si la tabla tiene la columna "Fecha"
        const columnCheckQuery = `
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = '${tableName}' 
              AND column_name = 'Fecha'
              AND table_schema = 'public';
        `;
        const [fechaColumnResult] = await sequelize.query(columnCheckQuery);
        const tieneColumnaFecha = fechaColumnResult.length > 0;

        // Armar query principal con filtro si corresponde
        let query = `SELECT * FROM "public"."${tableName}"`;
        if (tieneColumnaFecha && fechaDesde && fechaHasta) {
            const desde = dayjs(fechaDesde).startOf('day').toISOString();
            const hasta = dayjs(fechaHasta).endOf('day').toISOString();

            query += ` WHERE "Fecha" BETWEEN '${desde}' AND '${hasta}'`;
        }

        const [result] = await sequelize.query(query);

        // Si no hay registros, devolver solo las columnas
        if (result.length === 0) {
            const columnQuery = `
                SELECT column_name 
                FROM information_schema.columns 
                WHERE table_name = '${tableName}' AND table_schema = 'public';
            `;
            const [columns] = await sequelize.query(columnQuery);
            const columnNames = columns.map(col => col.column_name);
            return res.json({ columns: columnNames });
        }

        // Obtener los datos de las tablas relacionadas (por claves foráneas)
        const foreignData = {};
        for (const fk of foreignKeys) {
            const foreignQuery = `SELECT * FROM "public"."${fk.foreign_table}"`;
            const [foreignRows] = await sequelize.query(foreignQuery);
            foreignData[fk.column_name] = foreignRows;
        }

        // Procesar cada fila
        const resultadoFormateado = result.map(row => {
            const filaProcesada = { ...row };
            const fechaOriginal = filaProcesada.Fecha;

            // Reemplazar claves foráneas por sus datos
            for (const fk of foreignKeys) {
                const fkColumn = fk.column_name;
                const relatedTableData = foreignData[fkColumn];

                if (row[fkColumn]) {
                    const filaRelacionada = relatedTableData.find(
                        related => related[fk.foreign_column] === row[fkColumn]
                    );

                    if (filaRelacionada) {
                        Object.keys(filaRelacionada).forEach(key => {
                            if (!key.toLowerCase().startsWith('id')) {
                                filaProcesada[key] = filaRelacionada[key];
                            }
                        });
                        delete filaProcesada[fkColumn];
                    }
                }
            }
            filaProcesada.Fecha = fechaOriginal;

            // Agregar campo "Proveedor/Cliente" si la tabla es IVAVentas
            if (tableName === 'IVAVentas') {
                if (filaProcesada.Nombre && filaProcesada.Cuil) {
                    filaProcesada["Proveedor/Cliente"] = `Cliente`;
                } else if (filaProcesada.Nombre && filaProcesada.Cuit) {
                    filaProcesada["Proveedor/Cliente"] = `Proveedor`;
                } else {
                    filaProcesada["Proveedor/Cliente"] = 'Desconocido';
                }
            }

            // Formatear la fecha si existe
            if (filaProcesada.Fecha) {
                const date = new Date(filaProcesada.Fecha);
                filaProcesada.Fecha = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
            }

            return filaProcesada;
        });

        // Ordenar por fecha si existe
        if (resultadoFormateado.length > 0 && resultadoFormateado[0].Fecha) {
            resultadoFormateado.sort((a, b) => {
                const dateA = new Date(a.Fecha.split('/').reverse().join('-'));
                const dateB = new Date(b.Fecha.split('/').reverse().join('-'));
                return dateB - dateA;
            });
        }

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
