import Ingresos from "../models/Ingresos.js";
import Vendedor from "../models/Vendedores.js";
import ExcelJS from "exceljs";

export async function exportarExcellIngresos(req, res) {
    try {
        const ingresos = await Ingresos.findAll({
            include: [
                {
                    model: Vendedor,
                    attributes: ["Nombre"],
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
            { header: "Comprobante", key: "Comprobante", width: 15 },
            { header: "NroComprobante", key: "Comprobante", width: 15 },
            { header: "Total", key: "Total", width: 15 },
            { header: "Vendedor", key: "Vendedor", width: 20 },
            { header: "Pago", key: "Pago", width: 15 },
        ];

        ingresos.forEach((item) => {
            let metodoPago = "No especificado";

            if (item.cheque) metodoPago = "Cheque";
            else if (item.efectivo) metodoPago = "Efectivo";
            else if (item.transferencia) metodoPago = "Transferencia";
            worksheet.addRow({
                Fecha: item.fecha,
                Descripcion: `${item.nombre} - ${item.detalle || "Sin detalle"}`,
                Comprobante: item.nComprobante,
                Total: item.total,
                Vendedor: item.Vendedor.Nombre,
                Pago: metodoPago,
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