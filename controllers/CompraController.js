import Compras from "../models/Compras.js";
import Estado from "../models/Estados.js";
import MateriaPrima from "../models/MateriaPrima.js";
import CompraMateriaPrima from "../models/CompraMateriaPrima.js";
import sequelize from '../config.js';
import ExcelJS from "exceljs"
import dayjs from 'dayjs';
import { Op } from "sequelize";

export const obtenerEstructuraCompras = async (req, res) => {
  try {
    // Consulta para obtener la estructura de la tabla Compras, excluyendo claves foráneas
    const estructuraComprasQuery = `
            SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name = 'Compras' 
            AND table_schema = 'public'
            AND column_name NOT LIKE 'Id_%'
            AND column_name NOT LIKE 'id_%';
        `;
    const [estructuraCompras] = await sequelize.query(estructuraComprasQuery);

    // Consultas para obtener las estructuras de las tablas relacionadas, excluyendo claves foráneas
    const tablasRelacionadas = ['MateriaPrima', 'Estados'];
    const estructurasRelacionadas = {};

    for (const tabla of tablasRelacionadas) {
      const estructuraRelacionadaQuery = `
                SELECT column_name, data_type
                FROM information_schema.columns
                WHERE table_name = '${tabla}' 
                AND table_schema = 'public'
                AND column_name NOT LIKE 'Id_%'
                AND column_name NOT LIKE 'id_%';
            `;
      const [estructuraRelacionada] = await sequelize.query(estructuraRelacionadaQuery);
      estructurasRelacionadas[tabla] = estructuraRelacionada;
    }

    // Enviar las estructuras al frontend
    res.status(200).json({
      Compras: estructuraCompras,
      ...estructurasRelacionadas,
    });
  } catch (error) {
    console.error('Error al obtener la estructura de las tablas:', error);
    res.status(500).json({ error: 'Error al obtener la estructura de las tablas', details: error.message });
  }
};

export async function exportarExcelCompras(req, res) {
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

    // Obtener stock total por materia prima
    const stockData = await CompraMateriaPrima.findAll({
      attributes: [
        'id_MateriaPrima',
        [sequelize.fn('SUM', sequelize.col('Cantidad')), 'totalCantidad'],
      ],
      group: ['id_MateriaPrima'],
      raw: true,
    });

    const stockMap = new Map(
      stockData.map(item => [item.id_MateriaPrima, parseInt(item.totalCantidad)])
    );

    // Obtener compras con materias primas y sus cantidades
    const compras = await Compras.findAll({
      where: whereClause,
      include: [
        { model: Estado, attributes: ['Estado'] },
        {
          model: MateriaPrima,
          attributes: ['id_MateriaPrima', 'Nombre'],
          through: { attributes: ['Cantidad', 'PrecioUnitario'] }, // NECESARIO para traer la cantidad
        },
      ],
    });
    console.log(JSON.stringify(compras, null, 2));

    if (!compras.length) {
      return res.status(404).json({ message: "No hay datos de compras para exportar." });
    }

    // Crear el Excel
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Compras");

    worksheet.columns = [
      { header: "Fecha", key: "Fecha", width: 12 },
      { header: "Materia Prima", key: "Nombre", width: 30 },
      { header: "Marca", key: "Marca", width: 20 },
      { header: "Factura", key: "Factura", width: 20 },
      { header: "Cantidad", key: "Cantidad", width: 10 },
      { header: "Precio Unitario", key: "PrecioUnitario", width: 10 },
      { header: "Precio Total", key: "PrecioTotal", width: 10 },
      { header: "IVA 21", key: "IVA21", width: 10 },
      { header: "IVA 10.5", key: "IVA10_5", width: 10 },
      { header: "Percepcion IVA", key: "PercepcionIVA", width: 15 },
      { header: "Percepciones Muni Cba", key: "PercepcionesMuniCba", width: 20 },
      { header: "Flete", key: "Flete", width: 10 },
      { header: "Importe", key: "Importe", width: 15 },
      { header: "Estado", key: "Estado", width: 20 },
      { header: "Stock Total", key: "Stock", width: 15 },
    ];

    worksheet.getRow(1).eachCell(cell => {
      cell.font = { bold: true };
    });

    const formatoPesos = new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2,
    });
    
    // Agregar las filas
    compras.forEach(compra => {
      compra.MateriaPrimas.forEach(mp => {
        const cantidad = mp.CompraMateriaPrima?.Cantidad || 0;
        const precioUnitario = mp.CompraMateriaPrima?.PrecioUnitario || 0;
        const precioTotal = cantidad * precioUnitario;   
        worksheet.addRow({
          Fecha: dayjs(compra.Fecha).format('YYYY-MM-DD'),
          Nombre: mp.Nombre,
          Marca: compra.Marca,
          Factura: compra.Factura_N,
          Cantidad: cantidad || "",
          PrecioUnitario: precioUnitario ? formatoPesos.format(precioUnitario) : "",
          PrecioTotal: precioTotal ? formatoPesos.format(precioTotal) : "",
          IVA21: compra.IVA21 ? formatoPesos.format(compra.IVA21) : "", 
          IVA10_5: compra.IVA10_5 ? formatoPesos.format(compra.IVA10_5) : "",
          PercepcionIVA: compra.PercepcionIVA ? formatoPesos.format(compra.PercepcionIVA) : "",
          PercepcionesMuniCba: compra.PercepcionesMuniCba ? formatoPesos.format(compra.PercepcionesMuniCba) : "",
          Flete: compra.Flete ? formatoPesos.format(compra.Flete) : "",
          Importe: compra.Importe ? formatoPesos.format(compra.Importe) : "",
          Estado: compra.Estado?.Estado || '',
          Stock: stockMap.get(mp.id_MateriaPrima) || "",
        });
      });
    });

    // Enviar el archivo
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", "attachment; filename=compras.xlsx");

    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    console.error("Error al exportar datos de Compras:", error);
    return res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
}

export const guardarCompra = async (req, res) => {
  try {
    const { compra, materiasPrimas, estadoId } = req.body;
    const estado = await Estado.findByPk(estadoId);
    if (!estado) {
      return res.status(400).json({ message: 'Estado no válido' });
    }
    const nuevaCompra = await Compras.create({
      Fecha: compra.Fecha,
      Id_Estado: estadoId,
      Factura_N: compra.Factura_N,
      Importe: compra.Importe,
      Marca: compra.Marca,
      IVA21: compra.IVA21,
      IVA10_5: compra.IVA10_5,
      PercepcionIVA: compra.PercepcionIVA,
      PercepcionesMuniCba: compra.PercepcionesMuniCba,
      Flete: compra.Flete,
    });

    for (const mp of materiasPrimas) {
      let materia = await MateriaPrima.findOne({ where: { Nombre: mp.Nombre } });

      if (!materia) {
        materia = await MateriaPrima.create({ Nombre: mp.Nombre });
      }

      await CompraMateriaPrima.create({
        Id_Compras: nuevaCompra.Id_Compras,
        id_MateriaPrima: materia.id_MateriaPrima,
        Cantidad: mp.Cantidad,
        PrecioUnitario: mp.PrecioUnitario,
      });
    }

    return res.status(201).json({
      message: 'Compra y materias primas guardadas con éxito',
      compra: nuevaCompra,
    });

  } catch (error) {
    console.error('Error al guardar la compra:', error);
    return res.status(500).json({
      message: 'Error al guardar la compra',
      error: error.message,
    });
  }
}

export const modificarCompra = async (req, res) => {
  try {
    const { idCompra, compra, estadoId } = req.body;

    const compraExistente = await Compras.findByPk(idCompra);
    if (!compraExistente) {
      return res.status(404).json({ message: 'Compra no encontrada' });
    }

    const estado = await Estado.findOne({ where: { Estado: estadoId } });
    if (!estado) {
      return res.status(400).json({ message: 'Estado no válido' });
    }
    const estado_Id = estado.Id_Estado;
    
    await compraExistente.update({
      Fecha: compra.Fecha,
      Id_Estado: estado_Id,
      Factura_N: compra.Factura_N,
      Importe: limpiarNumero(compra.Importe),
      Marca: compra.Marca,
      IVA21: limpiarNumero(compra.IVA21),
      IVA10_5: limpiarNumero(compra.IVA10_5),
      PercepcionIVA: limpiarNumero(compra.PercepcionIVA),
      PercepcionesMuniCba: limpiarNumero(compra.PercepcionesMuniCba),
      Flete: limpiarNumero(compra.Flete),
    });


    return res.status(200).json({
      message: 'Compra modificada con éxito',
      compra: compraExistente,
    });

  } catch (error) {
    console.error('Error al modificar la compra:', error);
    return res.status(500).json({
      message: 'Error al modificar la compra',
      error: error.message,
    });
  }
};

export async function obtenerStock(req, res) {
  try {
    const stock = await CompraMateriaPrima.findAll({
      attributes: ['id_MateriaPrima', [sequelize.fn('sum', sequelize.col('Cantidad')), 'totalCantidad']],
      group: ['id_MateriaPrima'],
      raw: true,
    });

    return res.status(200).json(stock);
  } catch (error) {
    console.error("Error al obtener stock:", error);
    return res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
};

function limpiarNumero(valor) {
  if (typeof valor === 'string') {
    if (valor.trim() === "") {
      return null;  
    }
    return parseFloat(
      valor.replace(/\$/g, '').replace(/\./g, '').replace(',', '.').trim()
    );
  }
  return valor;
}


export default {
  obtenerEstructuraCompras,
  exportarExcelCompras,
  guardarCompra,
  modificarCompra,
  obtenerStock
};
