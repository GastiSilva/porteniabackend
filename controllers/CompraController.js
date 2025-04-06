import Compras from "../models/Compras.js";
import Estado from "../models/Estados.js";
import MateriaPrima from "../models/MateriaPrima.js";
import sequelize from '../config.js';
import ExcelJS from "exceljs"
import dayjs from 'dayjs';
import { Op } from "sequelize";

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


export async function exportarExcellCompras(req, res) {
    try {
         const { fechaDesde, fechaHasta } = req.body;
                const whereClause = {};
                if (fechaDesde && fechaHasta) {
                    const desde = dayjs(fechaDesde).startOf('day').toDate();
                    const hasta = dayjs(fechaHasta).endOf('day').toDate();
                    whereClause.Fecha = {
                        [Op.between]: [desde, hasta],
                    };
                }
                console.log("Filtro aplicado:", whereClause);
        const compras = await Compras.findAll({
            where: whereClause,
            include: [
                {
                    model: Estado,
                    attributes: ["Estado"],
                },
                {
                    model: MateriaPrima,
                    attributes: ["Nombre", "Marca", "Cantidad", "PrecioUnitario", "PrecioTotal"],
                },
            ],
        });

        if (!compras || compras.length === 0) {
            return res.status(404).json({ message: "No hay datos de producción para exportar." });
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Producción");

        worksheet.columns = [
            { header: "Fecha", key: "Fecha", width: 12 },
            { header: "Nombre", key: "Nombre", width: 30 },
            { header: "Marca", key: "Marca", width: 30 },
            { header: "Factura", key: "Factura", width: 30 },
            { header: "Cantidad", key: "Cantidad", width: 10 },
            { header: "Precio Unitario", key: "PrecioUnitario", width: 20 },
            { header: "Precio Total", key: "PrecioTotal", width: 20 },
            { header: "Estado", key: "Estado", width: 20 },

        ];

        worksheet.getRow(1).eachCell(cell => {
            cell.font = { bold: true };
          });

        compras.forEach((item) => {
            worksheet.addRow({
                Fecha: dayjs(item.Fecha).format('YYYY-MM-DD'),
                Nombre: item.MateriaPrima.Nombre,
                Marca: item.MateriaPrima.Marca,
                Factura: item.Factura_N,
                Cantidad: item.Cantidad,
                PrecioUnitario: item.PrecioUnit,
                PrecioTotal: item.Importe,
                Estado: item.Estado.Estado
            });
        });

        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", "attachment; filename=compras.xlsx");

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error("Error al exportar datos de Producción:", error);
        return res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

export default {
    obtenerEstructuraCompras,
    exportarExcellCompras
};
