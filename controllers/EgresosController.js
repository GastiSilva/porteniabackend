import ExcelJS from "exceljs";
import dayjs from 'dayjs';
import { Op } from "sequelize";
import { Egresos, Gastos, TipoGastos } from '../models/EgresoGastosAsosiaciones.js';

export async function exportarExcellEgresos(req, res) {
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

        const egresos = await Egresos.findAll({
            where: whereClause,
            include: [
                {
                    model: Gastos,
                    attributes: ["Id_TipoGastos", "Importe"],
                    include: [
                        {
                            model: TipoGastos,
                            attributes: ["Id_TipoGastos", "Tipo_Gasto"],
                        },
                    ],
                },
            ],
        });

        if (!egresos || egresos.length === 0) {
            return res.status(404).json({ message: "No hay datos de egresos para exportar." });
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Egresos");

        // Construir mapa de importes por egreso y tipo
        let tiposDeGastosIds = [];
        let egresosImportesPorTipo = {};

        egresos.forEach((egreso) => {
            egreso.Gastos.forEach((gasto) => {
                if (gasto.Id_TipoGastos) {
                    if (!tiposDeGastosIds.includes(gasto.Id_TipoGastos)) {
                        tiposDeGastosIds.push(gasto.Id_TipoGastos);
                    }
                    if (!egresosImportesPorTipo[egreso.Id_Egresos]) {
                        egresosImportesPorTipo[egreso.Id_Egresos] = {};
                    }
                    egresosImportesPorTipo[egreso.Id_Egresos][gasto.Id_TipoGastos] = gasto.Importe;
                    
                }
            });
        });

        // Buscar los nombres reales de los tipos de gasto
        let tiposDeGastos = new Set();
        const tipoGastoMap = {};
        const allTipoGastos = await TipoGastos.findAll({ attributes: ["Id_TipoGastos", "Tipo_Gasto"] });
        allTipoGastos.forEach((tipoGasto) => {
            if (tiposDeGastosIds.includes(tipoGasto.Id_TipoGastos)) {
                tiposDeGastos.add(tipoGasto.Tipo_Gasto);
                tipoGastoMap[tipoGasto.Id_TipoGastos] = tipoGasto.Tipo_Gasto;
            }
        });
        tiposDeGastos = Array.from(tiposDeGastos);

        // Encabezados
        const headers = ["Fecha", "Concepto", "Comprobante", "Importe Total", ...tiposDeGastos];
        worksheet.columns = headers.map((header) => ({ header, key: header, width: 25 }));

        // Negrita en los encabezados
        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true };
        });

        // Agregar filas
        egresos.forEach((egreso) => {
            let rowData = {
                Fecha: dayjs(egreso.Fecha).format('YYYY-MM-DD'),
                Concepto: egreso.Concepto,
                Comprobante: egreso.Comprobante,
                "Importe Total": egreso.ImporteTotal,
                ...tiposDeGastos.reduce((acc, tipo) => {
                    acc[tipo] = "";
                    return acc;
                }, {})
            };

            const importesDelEgreso = egresosImportesPorTipo[egreso.Id_Egresos] || {};
            Object.entries(importesDelEgreso).forEach(([idTipo, importe]) => {
                const nombreTipo = tipoGastoMap[idTipo];
                if (nombreTipo) {
                    rowData[nombreTipo] = importe;
                }
            });

            worksheet.addRow(rowData);
        });

        // Enviar el archivo
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", "attachment; filename=egresos.xlsx");

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error("Error al exportar datos de Egresos:", error);
        return res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

export async function guardarEgreso(req, res) {
    try {
        const { Fecha, Concepto, Comprobante, ImporteTotal } = req.body;

        if (!Fecha || !Concepto || !Comprobante || !ImporteTotal) {
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }

        const nuevoEgreso = await Egresos.create({
            Fecha,
            Concepto,
            Comprobante,
            ImporteTotal,
        });

        return res.status(201).json({ message: "Egreso guardado exitosamente.", data: nuevoEgreso });
    } catch (error) {
        console.error("Error al guardar el egreso:", error);
        return res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

export async function obtenerTodosEgresos(req, res) {
    try {
        const egresos = await Egresos.findAll({
            include: [
                {
                    model: Gastos,
                    attributes: ["Id_TipoGastos", "Importe"],
                    include: [
                        {
                            model: TipoGastos,
                            attributes: ["Id_TipoGastos", "Tipo_Gasto"],
                        },
                    ],
                },
            ],
        });

        if (!egresos || egresos.length === 0) {
            return res.status(404).json({ message: "No se encontraron egresos." });
        }

        return res.status(200).json({ data: egresos });
    } catch (error) {
        console.error("Error al obtener los egresos:", error);
        return res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

export async function modificarEgreso(req, res) {
    try {
        const { Id_Egresos } = req.params;
        const { ImporteTotal } = req.body;

        if (!Id_Egresos || (!ImporteTotal)) {
            return res.status(400).json({ message: "Datos insuficientes para realizar la actualización." });
        }

        const egreso = await Egresos.findByPk(Id_Egresos);

        if (!egreso) {
            return res.status(404).json({ message: "Egreso no encontrado." });
        }

       

        if (ImporteTotal !== undefined) egreso.ImporteTotal = ImporteTotal;

        await egreso.save();

        res.status(200).json({ message: "Egreso actualizado correctamente.", egreso });
    } catch (error) {
        console.error("Error al modificar el egreso:", error);
        return res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

export default {
    exportarExcellEgresos,
    guardarEgreso,
    obtenerTodosEgresos,
    modificarEgreso  
};