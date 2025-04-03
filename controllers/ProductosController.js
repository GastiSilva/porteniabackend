import Producto from "../models/Producto.js";
import ExcelJS from "exceljs";

export async function exportarExcellProductos(req, res) {
    try {
        const productos = await Producto.findAll({});

        if (!productos || productos.length === 0) {
            return res.status(404).json({ message: "No hay datos de productos para exportar." });
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Ventas");

        worksheet.columns = [
            { header: "Código Producto", key: "Codigo", width: 15 },
            { header: "Nombre Producto", key: "Nombre", width: 50 },
        ];

        worksheet.getRow(1).eachCell(cell => {
            cell.font = { bold: true };
          });

        productos.forEach((item) => {
            worksheet.addRow({
                Codigo: item.Codigo,
                Nombre: item.Nombre,
            });
        });

        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", "attachment; filename=productos.xlsx");

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error("Error al exportar datos de Productos:", error);
        return res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

export default {exportarExcellProductos}