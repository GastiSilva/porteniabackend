import Produccion from "../models/Produccion.js";
import Producto from "../models/Producto.js";
import ExcelJS from "exceljs";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
dayjs.extend(utc);
import { Op } from "sequelize";

export async function guardarEnProduccion(req, res) {
    try {
        const { productos } = req.body;
        if (!productos || !Array.isArray(productos)) {
            console.error("Datos inválidos:", productos);
            return res.status(400).json({ message: "Datos inválidos" });
        }

        const registrosProduccion = [];

        for (const producto of productos) {
            const { id, cantidad, fecha } = producto;
            const produccionExistente = await Produccion.findOne({
                where: { id_Producto: id },
            });

            if (produccionExistente) {
                produccionExistente.Cantidad += cantidad;
                await produccionExistente.save();
                registrosProduccion.push(produccionExistente);
            } else {
                const nuevoRegistro = await Produccion.create({
                    Id_Producto: id,
                    Cantidad: cantidad,
                    Fecha: dayjs(fecha).startOf('day').utc().format(),
                });
                registrosProduccion.push(nuevoRegistro);
            }

        }

        return res.status(201).json({
            message: "Productos guardados exitosamente en Producción.",
            data: registrosProduccion,
        });
    } catch (error) {
        console.error("Error al guardar en Producción:", error);
        return res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

export async function modificarProduccion(req, res) {
    try {
        const { id, cantidad } = req.params;
        if (!id || cantidad === undefined) {
            console.error("Datos inválidos:", { id, cantidad });
            return res.status(400).json({ message: "Datos inválidos" });
        }

        const produccionEncontrada = await Produccion.findOne({
            where: { id_Produccion: id },
        });

        if (!produccionEncontrada) {
            console.error(`Producción no encontrada: ${id}`);
            return res.status(404).json({
                message: `La producción con ID "${id}" no existe.`,
            });
        }

        const nuevaCantidad = produccionEncontrada.Cantidad + cantidad;

        if (nuevaCantidad < 0) {
            console.error(`Cantidad resultante negativa: ${nuevaCantidad}`);
            return res.status(400).json({
                message: `La cantidad resultante no puede ser negativa.`,
            });
        }

        produccionEncontrada.Cantidad = nuevaCantidad;

        await produccionEncontrada.save();

        return res.status(200).json({
            message: "Producción modificada exitosamente.",
            data: produccionEncontrada,
        });
    } catch (error) {
        console.error("Error al modificar Producción:", error);
        return res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

export async function exportarExcellProduccion(req, res) {
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

        const produccion = await Produccion.findAll({
            where: whereClause,
            include: [
                {
                    model: Producto,
                    as: "Producto",
                    attributes: ["Codigo", "Nombre"],
                },
            ],
        });

        if (!produccion || produccion.length === 0) {
            return res.status(404).json({ message: "No hay datos de producción para exportar." });
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Producción");

        worksheet.columns = [
            { header: "Fecha", key: "Fecha", width: 15 },
            { header: "Código Producto", key: "Codigo", width: 20 },
            { header: "Nombre Producto", key: "Nombre", width: 40 },
            { header: "Cantidad", key: "Cantidad", width: 15 },
        ];

        worksheet.getRow(1).eachCell(cell => {
            cell.font = { bold: true };
        });

        produccion.forEach((item) => {
            worksheet.addRow({
                Fecha: dayjs(item.Fecha).format('YYYY-MM-DD'),
                Codigo: item.Producto?.Codigo,
                Nombre: item.Producto?.Nombre,
                Cantidad: item.Cantidad,
            });
        });

        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", "attachment; filename=produccion.xlsx");

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error("Error al exportar datos de Producción:", error);
        return res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}


export default { guardarEnProduccion, modificarProduccion, exportarExcellProduccion };