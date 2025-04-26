import Ingresos from "../models/Ingresos.js";
import Vendedor from "../models/Vendedores.js";
import Estado from "../models/Estados.js";
import ExcelJS from "exceljs";
import dayjs from 'dayjs';
import { Op } from "sequelize";

export async function exportarExcellIngresos(req, res) {
    try {
        const { fechaDesde, fechaHasta } = req.body;
        const whereClause = {};
        if (fechaDesde && fechaHasta) {
            const desde = dayjs(fechaDesde).startOf('day').toDate();
            const hasta = dayjs(fechaHasta).endOf('day').toDate();
            whereClause.Fecha = { [Op.between]: [desde, hasta] };
        } else if (fechaDesde) {
            const desde = dayjs(fechaDesde).startOf('day').toDate();
            whereClause.Fecha = { [Op.gte]: desde };
        } else if (fechaHasta) {
            const hasta = dayjs(fechaHasta).endOf('day').toDate();
            whereClause.Fecha = { [Op.lte]: hasta };
        }


        const ingresos = await Ingresos.findAll({
            where: whereClause,
            include: [
                {
                    model: Vendedor,
                    attributes: ["Nombre"],
                },
                {
                    model: Estado,
                    attributes: ["Estado"],
                },
            ],
        });

        if (!ingresos || ingresos.length === 0) {
            return res.status(404).json({ message: "No hay datos de ingresos para exportar." });
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Ingresos");

        worksheet.columns = [
            { header: "Fecha", key: "Fecha", width: 15 },
            { header: "Descripcion", key: "Descripcion", width: 40 },
            { header: "NroComprobante", key: "Comprobante", width: 15 },
            { header: "Total", key: "Total", width: 15 },
            { header: "Vendedor", key: "Vendedor", width: 20 },
            { header: "Pago", key: "Pago", width: 15 },
            { header: "Estado Pago", key: "EstadoPago", width: 15 },
        ];

        worksheet.getRow(1).eachCell(cell => {
            cell.font = { bold: true };
        });

        ingresos.forEach((item) => {
            let metodoPago = [];
            if (item.Cheque) metodoPago.push("Cheque");
            if (item.Efectivo) metodoPago.push("Efectivo");
            if (item.Transferencia) metodoPago.push("Transferencia");
            metodoPago = metodoPago.length > 0 ? metodoPago.join(", ") : "No especificado";
            worksheet.addRow({
                Fecha: dayjs(item.Fecha).format('YYYY-MM-DD'),
                Descripcion: `${item.Nombre} - ${item.Detalle || "Sin detalle"}`,
                Comprobante: item.NroComprobante,
                Total: item.Total,
                Vendedor: item.Vendedor?.Nombre || "No especificado",
                Pago: metodoPago,
                EstadoPago: item.Estado.Estado,
            });
        });

        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", "attachment; filename=ingresos.xlsx");

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error("Error al exportar datos de Producción:", error);
        return res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

export async function modificarIngreso(req, res) {
    try {
        const { id_Ingreso } = req.params;
        const { Total, Estado: estadoNombre } = req.body;

        if (!id_Ingreso || (!Total && !estadoNombre)) {
            return res.status(400).json({ message: "Datos insuficientes para realizar la actualización." });
        }

        const ingreso = await Ingresos.findByPk(id_Ingreso);

        if (!ingreso) {
            return res.status(404).json({ message: "Ingreso no encontrado." });
        }

        if (estadoNombre) {
            const estado = await Estado.findOne({ where: { Estado: estadoNombre } });
            if (!estado) {
                return res.status(404).json({ message: "Estado no encontrado." });
            }
            ingreso.Id_Estado = estado.Id_Estado;
        }

        if (Total !== undefined) ingreso.Total = Total;

        await ingreso.save();

        res.status(200).json({ message: "Ingreso actualizado correctamente.", ingreso });
    } catch (error) {
        console.error("Error al modificar el ingreso:", error);
        return res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

export async function agregarIngreso(req, res) {
    try {
        const { Fecha, Nombre, Detalle, NroComprobante, Total, Id_Vendedor, Id_Estado, MetodoPago } = req.body;

        if (!Fecha || !Nombre || !Total || !Id_Vendedor || !Id_Estado || !MetodoPago) {
            return res.status(400).json({ message: "Datos insuficientes para agregar el ingreso." });
        }

        const vendedor = await Vendedor.findByPk(Id_Vendedor);
        if (!vendedor) {
            return res.status(404).json({ message: "Vendedor no encontrado." });
        }

        const estado = await Estado.findByPk(Id_Estado);
        if (!estado) {
            return res.status(404).json({ message: "Estado no encontrado." });
        }

        const nuevoIngreso = await Ingresos.create({
            Fecha,
            Nombre,
            Detalle,
            NroComprobante,
            Total,
            Id_Vendedor,
            Id_Estado,
            Cheque: MetodoPago.includes('Cheque'),
            Efectivo: MetodoPago.includes('Efectivo'),
            Transferencia: MetodoPago.includes('Transferencia'),

        });
        console.log("NUEVO INGRESO", nuevoIngreso)

        res.status(201).json({ message: "Ingreso agregado correctamente.", ingreso: nuevoIngreso });
    } catch (error) {
        console.error("Error al agregar el ingreso:", error);
        return res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

export default { exportarExcellIngresos, modificarIngreso, agregarIngreso };