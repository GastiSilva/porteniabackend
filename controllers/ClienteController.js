import Clientes from '../models/Clientes.js';
import sequelize from '../config.js'
import ExcelJS from "exceljs";

export const registrarCliente = async (req, res) => {
  const { Nombre, Cuil } = req.body;

  try {
    const clienteExistente = await Clientes.findOne({
      where: sequelize.where(
        sequelize.fn('LOWER', sequelize.col('Nombre')),
        Nombre.toLowerCase()
      )
    });

    if (clienteExistente) {
      return res.status(400).json({ mensaje: 'El cliente ya existe' });
    }

    const nuevoCliente = await Clientes.create({
      Nombre: Nombre,
      Cuil
    });

    return res.status(201).json({ mensaje: 'cliente registrado exitosamente', cliente: nuevoCliente });
  } catch (error) {
    console.error('Error del servidor:', error);
    return res.status(500).json({ mensaje: 'Error del servidor' });
  }
};

export const eliminarCliente = async (req, res) => {
  const { id_Cliente } = req.body;

  try {
    const cliente = await Clientes.findByPk(id_Cliente);

    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }

    await cliente.destroy();

    return res.status(200).json({ mensaje: 'Cliente eliminado exitosamente' });
  } catch (error) {
    console.error('Error del servidor:', error);
    return res.status(500).json({ mensaje: 'Error del servidor' });
  }
};

export async function exportarExcellClientes(req, res) {
  try {
      const clientes = await Clientes.findAll({});

      if (!clientes || clientes.length === 0) {
          return res.status(404).json({ message: "No hay datos de clientes para exportar." });
      }

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Ventas");

      worksheet.columns = [
          { header: "Nombre", key: "Nombre", width: 45, font: { bold: true } },
          { header: "Cuil", key: "Cuil", width: 20, font: { bold: true }},
      ];

      worksheet.getRow(1).eachCell(cell => {
        cell.font = { bold: true };
      });
      
      clientes.forEach((item) => {
          worksheet.addRow({
              Nombre: item.Nombre,
              Cuil: item.Cuil,
          });
      });

      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
      res.setHeader("Content-Disposition", "attachment; filename=clientes.xlsx");

      await workbook.xlsx.write(res);
      res.end();
  } catch (error) {
      console.error("Error al exportar datos de Productos:", error);
      return res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
}

export default { registrarCliente, eliminarCliente, exportarExcellClientes };
