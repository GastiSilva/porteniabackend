import Produccion from "../models/Produccion.js";
import Producto from "../models/Producto.js";
import VentasMercaderia from "../models/VentasMercaderia.js";
import sequelize from "sequelize";
import ExcelJS from "exceljs";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
dayjs.extend(utc);
import { Op } from "sequelize";
import VentaMercaderia from "../models/VentasMercaderia.js";

export async function obtenerVentasMercaderia(req, res) {
    try {
      const { fechaDesde, fechaHasta, idProducto } = req.query;
      
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
  
      if (idProducto) {
        whereClause.id_Producto = idProducto;
      }
  
      const ventas_mercaderia = await VentaMercaderia.findAll({
        where: whereClause,
        include: [
          {
            model: Producto,
            as: "Producto",
            attributes: ["Codigo", "Nombre"],
          },
        ],
      });
  
      if (!ventas_mercaderia || ventas_mercaderia.length === 0) {
        return res.status(200).json({
          message: "No hay registros de ventas de mercaderia.",
          data: [],
        });
      }
  
      const ventasProcesada = ventas_mercaderia.map((fila) => {
        const filaProcesada = fila.toJSON();
        const date = new Date(filaProcesada.Fecha);
        filaProcesada.Fecha = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        return filaProcesada;
      });
  
      return res.status(200).json({
        message: "Registros de ventas de mercaderia obtenidos exitosamente.",
        data: ventasProcesada,
      });
    } catch (error) {
      console.error("Error al obtener Devolucion:", error);
      return res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

export async function guardarVentaMercaderia(req, res) {
    try {
        const { productos } = req.body;
        if (!productos || !Array.isArray(productos)) {
            console.error("Datos inválidos:", productos);
            return res.status(400).json({ message: "Datos inválidos" });
        }
        const registrosVentaMercaderia = [];

        for (const producto of productos) {
            const { nombre, cantidad, fecha } = producto;

            const productoEncontrado = await Producto.findOne({
                where: sequelize.where(
                    sequelize.fn('LOWER', sequelize.col('Nombre')),
                    nombre.toLowerCase()
                ),
                attributes: ["Id_Producto"],
            });

            if (!productoEncontrado) {
                console.error(`Producto no encontrado: ${nombre}`);
                return res.status(404).json({
                    message: `El producto con nombre "${nombre}" no existe.`,
                });
            }

            registrosVentaMercaderia.push({
                id_Producto: productoEncontrado.Id_Producto,
                Cantidad: cantidad,
                Fecha: dayjs(fecha).startOf('day').utc().format(),
            });
        }

        const resultados = await VentasMercaderia.bulkCreate(registrosVentaMercaderia);

        for (const registro of registrosVentaMercaderia) {
            const { id_Producto, Cantidad } = registro;
            const productos = await Produccion.findAll({
                where: { id_Producto },
                order: [['Fecha', 'ASC']],
            });
            let cantidadRestante = Cantidad;

            for (const producto of productos) {
                if (cantidadRestante <= 0) break;
                if (producto.Cantidad <= cantidadRestante) {
                    await producto.destroy();
                    cantidadRestante -= producto.Cantidad;
                } else {
                    await producto.update({
                        Cantidad: producto.Cantidad - cantidadRestante,
                    });
                    cantidadRestante = 0;
                }
            }
        }


        return res.status(201).json({
            message: "Productos guardados exitosamente en Ventas.",
            data: resultados,
        });
    } catch (error) {
        console.error("Error al guardar en Ventas:", error);
        return res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

export async function modificarCantidadVenta(req, res) {
    try {
        const { id } = req.params;
        const { nuevaCantidad } = req.body;
        if (!id || typeof nuevaCantidad !== 'number' || nuevaCantidad < 0) {
            console.error("Datos inválidos:", { id, nuevaCantidad });
            return res.status(400).json({ message: "Datos inválidos" });
        }

        const ventaEncontrada = await VentasMercaderia.findOne({
            where: { Id_VentaMercaderia: id },
        });

        if (!ventaEncontrada) {
            console.error(`Venta no encontrada: ${id}`);
            return res.status(404).json({
                message: `La venta con ID "${id}" no existe.`,
            });
        }

        const diferencia = nuevaCantidad - ventaEncontrada.Cantidad;

        if (diferencia > 0) {
            const productos = await Produccion.findAll({
                where: { id_Producto: ventaEncontrada.id_Producto },
                order: [['Fecha', 'ASC']],
            });

            let cantidadRestante = diferencia;

            for (const producto of productos) {
                if (cantidadRestante <= 0) break;
                if (producto.Cantidad <= cantidadRestante) {
                    await producto.destroy();
                    cantidadRestante -= producto.Cantidad;
                } else {
                    await producto.update({
                        Cantidad: producto.Cantidad - cantidadRestante,
                    });
                    cantidadRestante = 0;
                }
            }

            if (cantidadRestante > 0) {
                console.error("No hay suficiente stock para aumentar la cantidad.");
                return res.status(400).json({
                    message: "No hay suficiente stock para aumentar la cantidad.",
                });
            }
        } else if (diferencia < 0) {
            await Produccion.create({
                Id_Producto: ventaEncontrada.id_Producto,
                Cantidad: Math.abs(diferencia),
                Fecha: dayjs().startOf('day').utc().format(),
            });
        }

        ventaEncontrada.Cantidad = nuevaCantidad;
        await ventaEncontrada.save();

        return res.status(200).json({
            message: "Cantidad de venta modificada exitosamente.",
            data: ventaEncontrada,
        });
    } catch (error) {
        console.error("Error al modificar la cantidad de venta:", error);
        return res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

export async function exportarExcellVentas(req, res) {
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

        const ventasM = await VentasMercaderia.findAll({
            where: whereClause,
            include: [
                {
                    model: Producto,
                    attributes: ["Codigo", "Nombre"],
                },
            ],
        });

        if (!ventasM || ventasM.length === 0) {
            return res.status(404).json({ message: "No hay datos de producción para exportar." });
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Ventas");

        worksheet.columns = [
            { header: "Fecha", key: "Fecha", width: 15 },
            { header: "Código Producto", key: "Codigo", width: 20 },
            { header: "Nombre Producto", key: "Nombre", width: 40 },
            { header: "Cantidad", key: "Cantidad", width: 15 },
        ];

        worksheet.getRow(1).eachCell(cell => {
            cell.font = { bold: true };
        });

        ventasM.forEach((item) => {
            worksheet.addRow({
                Fecha: dayjs(item.Fecha).format('YYYY-MM-DD'),
                Codigo: item.Producto.Codigo,
                Nombre: item.Producto.Nombre,
                Cantidad: item.Cantidad,
            });
        });

        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", "attachment; filename=ventasM.xlsx");

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error("Error al exportar datos de Producción:", error);
        return res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

export default { guardarVentaMercaderia, exportarExcellVentas, modificarCantidadVenta, obtenerVentasMercaderia }; 