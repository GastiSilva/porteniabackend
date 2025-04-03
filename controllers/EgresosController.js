import  Egresos  from "../models/Egresos.js";
import Gastos from "../models/Gastos.js";
import TipoGastos from "../models/TipoGastos.js";
// import Proveedor from "../models/Proveedor.js";
import ExcelJS from "exceljs";


export async function exportarExcellEgresos(req, res) {
    try {
        const egresos = await Egresos.findAll({
            include: [
                {
                    model: Gastos,
                    attributes: ["Importe"],
                },
                {
                    model: TipoGastos,
                    attributes: ["Tipo_Gasto"],
                },
            ],
        });

        if (!egresos || egresos.length === 0) {
            return res.status(404).json({ message: "No hay datos de producción para exportar." });
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Egresos");

        worksheet.columns = [
            { header: "Fecha", key: "Fecha", width: 20 },
            { header: "Concepto", key: "Concepto", width: 30 },
            { header: "Comprobante", key: "Comprobante", width: 15 },
            { header: "Importe Total", key: "ImporteTotal", width: 20 },
            { header: "Tipo Gasto", key: "TipoGasto", width: 20 },
            { header: "Importe Gasto", key: "Importe", width: 15 },
        ];

        worksheet.getRow(1).eachCell(cell => {
            cell.font = { bold: true };
          });


          //completar de aqui hacia abajo cuando se tenga la info prescisa
          
        egresos.forEach((item) => {
            worksheet.addRow({
                Codigo: item.Producto.Codigo,
                Nombre: item.Producto.Nombre,
                Cantidad: item.Cantidad,
            });
        });

        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", "attachment; filename=egresos.xlsx");

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error("Error al exportar datos de Producción:", error);
        return res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}
