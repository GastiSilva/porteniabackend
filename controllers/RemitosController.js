import Remito from '../models/Remito.js';
import Estado from '../models/Estados.js';
import RemitoProducto from '../models/RemitoProducto.js';
import Producto from '../models/Producto.js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
dayjs.extend(utc);
import { Op } from "sequelize";
import { buildRemitoHtml } from './templates/remitoPdfTemplate.js';
import { renderHtmlToPdf } from './utils/pdfBrowser.js';


export const generarPDF = async (req, res) => {
  const { id } = req.params;

  const remito = await Remito.findByPk(id, {
    attributes: ['Id_Remito', 'Senior', 'Domicilio', 'Fecha', 'Id_Estado', 'remitoPDF']
  });

  if (!remito) {
    return res.status(404).json({ error: 'Remito no encontrado' });
  }

  const RemitoProductoEncontrado = await RemitoProducto.findAll({
    where: { Id_Remito: id },
    attributes: ['Id_RemitoProducto', 'Id_Remito', 'Id_Producto', 'Cantidad', 'PrecioUnit', 'PrecioTotal']
  });

  const EstadoEncontrado = await Estado.findByPk(remito.Id_Estado, {
    attributes: ['Id_Estado', 'Estado']
  });

  const productosIds = RemitoProductoEncontrado.map(rp => rp.Id_Producto);
  const ProductoEncontrado = await Producto.findAll({
    where: { Id_Producto: productosIds },
    attributes: ['Id_Producto', 'Codigo', 'Nombre']
  });

  const totalOperacion = RemitoProductoEncontrado.reduce((total, rp) => total + rp.Cantidad * rp.PrecioUnit, 0);
  const anio = dayjs(remito.Fecha).utc().year();
  const mes = dayjs(remito.Fecha).utc().month() + 1; // Los meses en dayjs son 0-indexados
  const dia = dayjs(remito.Fecha).utc().date();

  const productData = RemitoProductoEncontrado.map(rp => {
    const producto = ProductoEncontrado.find(p => p.Id_Producto === rp.Id_Producto);

    return {
      codigo: producto?.Codigo || 'N/A',
      producto: producto?.Nombre || 'Producto desconocido',
      cantidad: rp.Cantidad,
      precio: rp.PrecioUnit,
      subtotal: rp.PrecioTotal
    };
  });

  const html = buildRemitoHtml({
    remito,
    estado: EstadoEncontrado?.Estado || 'Sin estado',
    productos: productData,
    total: totalOperacion,
    dia,
    mes,
    anio
  });

  const pdfBuffer = await renderHtmlToPdf(html);

  await Remito.update(
    { remitoPDF: pdfBuffer },
    { where: { Id_Remito: id } }
  );

  res.setHeader('Content-disposition', 'attachment; filename=remito_fabrica.pdf');
  res.setHeader('Content-type', 'application/pdf');
  res.send(pdfBuffer);
}

export const obtenerRemitos = async (req, res) => {   
  try {
    const { fechaDesde, fechaHasta } = req.query;
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

    const remitos = await Remito.findAll({
      where: whereClause,
      attributes: ['Id_Remito', 'Senior', 'Fecha', 'Id_Estado', 'remitoPDF']
    });
    
    const remitosConEstado = await Promise.all(remitos.map(async (remito) => {
      const estado = await Estado.findByPk(remito.Id_Estado, {
        attributes: ['Id_Estado', 'Estado']
      });
      return {
        ...remito.toJSON(),
        Estado: estado
      };
    }));

    const remitosConTotal = await Promise.all(remitosConEstado.map(async (remito) => {
      const remitoTotal = await RemitoProducto.findAll({
        where: { Id_Remito: remito.Id_Remito },
        attributes: ['PrecioTotal']
      });

      const total = remitoTotal.reduce((sum, rp) => sum + parseFloat(rp.toJSON().PrecioTotal || 0), 0);

      return {
        ...remito,
        Total: total
      };
    }));

    return res.status(200).json(remitosConTotal);
    
  } catch (error) {
    console.error('Error al obtener los remitos:', error);
    return res.status(500).json({ error: 'Error al obtener los remitos' });
  }
};

export const obtenerPDF = async (req, res) => {
  const { Id_Remito } = req.body;

  const remito = await Remito.findByPk(Id_Remito, {
    attributes: ['remitoPDF']
  });

  if (!remito) {
    return res.status(404).json({ error: 'Remito no encontrado' });
  }

  if (!remito.remitoPDF) {
    return res.status(404).json({ error: 'PDF no encontrado' });
  }

  res.setHeader('Content-disposition', 'attachment; filename=remito_fabrica.pdf');
  res.setHeader('Content-type', 'application/pdf');
  res.send(remito.remitoPDF);
};

export const eliminarRemito = async (req, res) => {
  const { id } = req.params;

  try {
    const remito = await Remito.findByPk(id);

    if (!remito) {
      return res.status(404).json({ error: 'Remito no encontrado' });
    }

    // Eliminar los registros asociados en RemitoProducto
    await RemitoProducto.destroy({ where: { Id_Remito: id } });

    // Eliminar el remito
    await Remito.destroy({ where: { Id_Remito: id } });

    return res.status(200).json({ message: 'Remito y sus productos asociados eliminados correctamente' });
  } catch (error) {
    console.error('Error al eliminar el remito:', error);
    return res.status(500).json({ error: 'Error al eliminar el remito' });
  }
};


export default { generarPDF, obtenerRemitos, obtenerPDF, eliminarRemito }; 
