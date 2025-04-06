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
                    whereClause.Fecha = {
                        [Op.between]: [desde, hasta],
                    };
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
            let metodoPago = "No especificado";

            if (item.Cheque) metodoPago = "Cheque";
            else if (item.Efectivo) metodoPago = "Efectivo";
            else if (item.Transferencia) metodoPago = "Transferencia";
            worksheet.addRow({
                Fecha: dayjs(item.Fecha).format('YYYY-MM-DD'),
                Descripcion: `${item.Nombre} - ${item.Detalle || "Sin detalle"}`,
                Comprobante: item.NroComprobante,
                Total: item.Total,
                Vendedor: item.Vendedor.Nombre,
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

export default { exportarExcellIngresos };