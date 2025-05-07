import Produccion from "../models/Produccion.js";
import Producto from "../models/Producto.js";
import Devolucion from "../models/Devolucion.js";
import sequelize from "sequelize";
import ExcelJS from "exceljs";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
dayjs.extend(utc);
import { Op } from "sequelize";

export async function obtenerDevolucion(req, res) {
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
  
      const devolucion = await Devolucion.findAll({
        where: whereClause,
        include: [
          {
            model: Producto,
            as: "Producto",
            attributes: ["Codigo", "Nombre"],
          },
        ],
      });
  
      if (!devolucion || devolucion.length === 0) {
        return res.status(200).json({
          message: "No hay registros de devolución.",
          data: [],
        });
      }
  
      const devolucionProcesada = devolucion.map((fila) => {
        const filaProcesada = fila.toJSON();
        const date = new Date(filaProcesada.Fecha);
        filaProcesada.Fecha = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        return filaProcesada;
      });
  
      return res.status(200).json({
        message: "Registros de devolución obtenidos exitosamente.",
        data: devolucionProcesada,
      });
    } catch (error) {
      console.error("Error al obtener Devolucion:", error);
      return res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

export async function guardarEnDevolucion(req, res) {
    try {
        const { productos } = req.body;
        if (!productos || !Array.isArray(productos)) {
            console.error("Datos inválidos:", productos);
            return res.status(400).json({ message: "Datos inválidos" });
        }
        const registrosDevolucion = [];

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
            console.log("Producto fgechaaaa:", fecha);
            registrosDevolucion.push({
                id_Producto: productoEncontrado.Id_Producto,
                Cantidad: cantidad,
                Fecha: dayjs(fecha).startOf('day').utc().format(),
            });
        }

        const resultados = await Devolucion.bulkCreate(registrosDevolucion);
        
        for (const registro of registrosDevolucion) {
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
            message: "Productos guardados exitosamente en Producción.",
            data: resultados,
        });
    } catch (error) {
        console.error("Error al guardar en Devolucion:", error);
        return res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

export async function eliminarDeDevolucion(req, res) {
    try {
        const { id, cantidad } = req.params;
        if (!id || !cantidad) {
            console.error("Datos inválidos:", { id, cantidad });
            return res.status(400).json({ message: "Datos inválidos" });
        }

        const devolucionEncontrada = await Devolucion.findOne({
            where: { id_Devolucion: id },
        });

        if (!devolucionEncontrada) {
            console.error(`Devolucion no encontrada: ${id}`);
            return res.status(404).json({
                message: `La Devolucion con ID "${id}" no existe.`,
            });
        }

        if (devolucionEncontrada.Cantidad < cantidad) {
            console.error(`Cantidad a eliminar excede la cantidad disponible: ${cantidad}`);
            return res.status(400).json({
                message: `La cantidad a eliminar excede la cantidad disponible en Devolucion.`,
            });
        }

        devolucionEncontrada.Cantidad -= cantidad;

        if (devolucionEncontrada.Cantidad === 0) {
            await Devolucion.destroy({
                where: { id_Produccion: id },
            });
            return res.status(200).json({
                message: "Devolucion eliminada exitosamente.",
            });
        } else {
            await devolucionEncontrada.save();
            return res.status(200).json({
                message: "Cantidad eliminada exitosamente de devolucion.",
                data: devolucionEncontrada,
            });
        }
    } catch (error) {
        console.error("Error al eliminar de Devolucion:", error);
        return res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

export async function modificarCantidadDevolucion(req, res) {
    try {
        const { id } = req.params;
        const { nuevaCantidad } = req.body;
        if (!id || typeof nuevaCantidad !== 'number' || nuevaCantidad < 0) {
            console.error("Datos inválidos:", { id, nuevaCantidad });
            return res.status(400).json({ message: "Datos inválidos" });
        }

        const devolucionEncontrada = await Devolucion.findOne({
            where: { id_Devolucion: id },
        });

        if (!devolucionEncontrada) {
            console.error(`Devolución no encontrada: ${id}`);
            return res.status(404).json({
                message: `La devolución con ID "${id}" no existe.`,
            });
        }

        const diferencia = nuevaCantidad - devolucionEncontrada.Cantidad;

        if (diferencia > 0) {
            const productos = await Produccion.findAll({
                where: { id_Producto: devolucionEncontrada.id_Producto },
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
                Id_Producto: devolucionEncontrada.id_Producto,
                Cantidad: Math.abs(diferencia),
                Fecha: dayjs().startOf('day').utc().format(),
            });
        }

        devolucionEncontrada.Cantidad = nuevaCantidad;
        await devolucionEncontrada.save();

        return res.status(200).json({
            message: "Cantidad de devolución modificada exitosamente.",
            data: devolucionEncontrada,
        });
    } catch (error) {
        console.error("Error al modificar la cantidad de devolución:", error);
        return res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

export async function exportarExcellDevolucion(req, res) {
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
                

        const devolucion = await Devolucion.findAll({
            where: whereClause,
            include: [
                {
                    model: Producto,
                    attributes: ["Codigo", "Nombre"],
                },
            ],
        });

        if (!devolucion || devolucion.length === 0) {
            return res.status(404).json({ message: "No hay datos de producción para exportar." });
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Devoluccion");

        worksheet.columns = [
            { header: "Fecha", key: "Fecha", width: 15 },
            { header: "Código Producto", key: "Codigo", width: 20 },
            { header: "Nombre Producto", key: "Nombre", width: 40 },
            { header: "Cantidad", key: "Cantidad", width: 15 },
        ];

        worksheet.getRow(1).eachCell(cell => {
            cell.font = { bold: true };
          });
          
        devolucion.forEach((item) => {
            worksheet.addRow({
                Fecha: dayjs(item.Fecha).format('YYYY-MM-DD'),
                Codigo: item.Producto.Codigo,
                Nombre: item.Producto.Nombre,
                Cantidad: item.Cantidad,
            });
        });

        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", "attachment; filename=devolucion.xlsx");

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error("Error al exportar datos de Producción:", error);
        return res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

export default { guardarEnDevolucion, eliminarDeDevolucion, exportarExcellDevolucion, modificarCantidadDevolucion, obtenerDevolucion };