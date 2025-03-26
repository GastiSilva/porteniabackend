import PDFDocument from 'pdfkit';
import Remito from '../models/Remito.js';
import Estado from '../models/Estados.js';
import RemitoProducto from '../models/RemitoProducto.js';
import Producto from '../models/Producto.js';
import { Writable } from 'stream';

// Función para generar y enviar el PDF
export const generarPDF = async (req, res) => {
  const doc = new PDFDocument();

  //variables para su uso

  const {id} = req.params;

  const remito = await Remito.findByPk(id, {
    attributes: ['Id_Remito', 'Senior', 'Domicilio', 'Fecha', 'Id_Estado', 'remitoPDF']
  });
  const RemitoProductoEncontrado = await RemitoProducto.findAll({
    where: {  Id_Remito: id },
    attributes: ['Id_RemitoProducto', 'Id_Remito', 'Id_Producto', 'Cantidad', 'PrecioUnit', 'PrecioTotal'] 
  });
  console.log('RemitoProductoEncontrado:', RemitoProductoEncontrado);

  const EstadoEncontrado = await Estado.findByPk(remito.Id_Estado, {
    attributes: ['Id_Estado', 'Estado']
  });
 const productosIds = RemitoProductoEncontrado.map(rp => rp.Id_Producto);
  const ProductoEncontrado = await Producto.findAll({
    where: { Id_Producto: productosIds },
    attributes: ['Id_Producto', 'Codigo', 'Nombre']
  });

  const totalOperacion = RemitoProductoEncontrado.reduce((total, rp) => total + rp.Cantidad * rp.PrecioTotal, 0);
  const anio = remito.Fecha.getFullYear();
  const mes = remito.Fecha.getMonth();
  const dia = remito.Fecha.getDate();
  

  if (!remito) {
    return res.status(404).json({ error: 'Remito no encontrado' });
  }

  // Configurar los encabezados de la respuesta para la descarga del PDF
  res.setHeader('Content-disposition', 'attachment; filename=remito_fabrica.pdf');
  res.setHeader('Content-type', 'application/pdf');
  //buffer parab guardar remito
  const buffers = [];
  const writableStream = new Writable({
    write(chunk, encoding, callback) {
      buffers.push(chunk);
      callback();
    }
  });

  // Pipe el PDF a la respuesta
  doc.pipe(res);
  doc.pipe(writableStream);

  // Dimensiones y posición del primer cuadro (izquierda)
  const cuadroIzquierdoX = 20;
  const cuadroIzquierdoY = 20;
  const cuadroIzquierdoWidth = 250;
  const cuadroIzquierdoHeight = 100;

  // Dibujar el primer cuadro
  doc.rect(cuadroIzquierdoX, cuadroIzquierdoY, cuadroIzquierdoWidth, cuadroIzquierdoHeight).stroke();

  // Texto dentro del primer cuadro
  const textMarginX = cuadroIzquierdoX + 10;
  let textPositionY = cuadroIzquierdoY + 10;
  doc.font('Helvetica-Bold').fontSize(16).text('        LA PORTEÑA S.R.L.', textMarginX, textPositionY, { align: 'left' });
  textPositionY += 20;
  doc.font('Helvetica').fontSize(12).text('                EL GUSTO CASERO', textMarginX, textPositionY, { align: 'left' });
  textPositionY += 15;
  doc.fontSize(10).text('  PABLO DE GUZMAN 481 - TEL 4764838', textMarginX, textPositionY, { align: 'left' });
  textPositionY += 12;
  doc.text('  B° MARQUÉS DE SOBREMONTE - CP 5008', textMarginX, textPositionY, { align: 'left' });
  textPositionY += 12;
  doc.text('  CÓRDOBA', textMarginX, textPositionY, { align: 'left' });
  textPositionY += 12;
  doc.text('  IVA RESPONSABLE INSCRIPTO', textMarginX, textPositionY, { align: 'left' });

  // Dimensiones y posición del segundo cuadro (derecha, menos separado)
  const cuadroDerechoX = cuadroIzquierdoX + cuadroIzquierdoWidth + 20;
  const cuadroDerechoY = cuadroIzquierdoY;
  const cuadroDerechoWidth = 275;
  const cuadroDerechoHeight = 100;

  // Dibujar el segundo cuadro
  doc.rect(cuadroDerechoX, cuadroDerechoY, cuadroDerechoWidth, cuadroDerechoHeight).stroke();

  // Texto dentro del segundo cuadro
  const textRightMarginX = cuadroDerechoX + 10;
  let textRightPositionY = cuadroDerechoY + 10;
  doc.font('Helvetica-Bold').text('PRESUPUESTO', textRightMarginX, textRightPositionY, { align: 'left' });
  textRightPositionY += 15;
  doc.font('Helvetica').text('DOCUMENTO NO VALIDO COMO FACTURA', textRightMarginX, textRightPositionY, { align: 'left' });
  textRightPositionY += 15;
  doc.text('N° 0001 - 00000001', textRightMarginX, textRightPositionY, { align: 'left' });
  textRightPositionY += 20;
  doc.text(`DIA: ${dia}  MES: ${mes}  AÑO: ${anio}`, textRightMarginX, textRightPositionY, { align: 'left' });

  // Cuadro de información del cliente, justo debajo de los dos cuadros con poca separación
  const cuadroDatosX = cuadroIzquierdoX;
  const cuadroDatosY = cuadroIzquierdoY + cuadroIzquierdoHeight + 10;
  const cuadroDatosWidth = cuadroDerechoX + cuadroDerechoWidth - cuadroIzquierdoX;
  const cuadroDatosHeight = 50;

  // Dibujar el cuadro de información del cliente
  doc.rect(cuadroDatosX, cuadroDatosY, cuadroDatosWidth, cuadroDatosHeight).stroke();

  const textDatosX = cuadroDatosX + 10;
  let textDatosY = cuadroDatosY + 10;
  doc.text(`SEÑOR(ES): ${remito?.Senior}`, textDatosX, textDatosY, { align: 'left' });
  textDatosY += 15;
  doc.text(`DOMICILIO: ${remito?.Domicilio}`, textDatosX, textDatosY, { align: 'left' });

  // Línea separadora
  doc.moveTo(20, cuadroDatosY + cuadroDatosHeight + 10).lineTo(570, cuadroDatosY + cuadroDatosHeight + 10).stroke();

  // Encabezado de la tabla con cuadros alrededor de cada columna
  const tableTop = cuadroDatosY + cuadroDatosHeight + 30;
  const tableX = cuadroIzquierdoX;
  const tableTopInit = cuadroDatosY + cuadroDatosHeight + 30;
  const tableXInit = cuadroIzquierdoX;

//encabezados
  doc.font('Helvetica-Bold').fontSize(10);
  const headerHeight = 15;
  
  doc.rect(tableX, tableTop, 60, headerHeight).stroke(); 
  doc.text('CÓDIGO', tableX + 5, tableTop + 3);
  
  doc.rect(tableX + 60, tableTop, 220, headerHeight).stroke(); 
  doc.text('PRODUCTO', tableX + 85, tableTop + 3);

  doc.rect(tableX + 280, tableTop, 60, headerHeight).stroke(); 
  doc.text('CANTIDAD', tableX + 285, tableTop + 3);

  doc.rect(tableX + 340, tableTop, 110, headerHeight).stroke(); 
  doc.text('PRECIO UNITARIO', tableX + 345, tableTop + 3);

  doc.rect(tableX + 450, tableTop, 100, headerHeight).stroke(); 
  doc.text('SUBTOTAL', tableX + 455, tableTop + 3);

  // Dibujar líneas extendidas para la tabla
  const tableEndY = 700;
  doc.font('Helvetica'); // Volver a la fuente regular para el contenido de la tabla
  let positionY = tableTop + 20;
  let positionYInit = tableTop + 20;

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
  

  productData.forEach((item) => {
    doc.text(item.codigo.toString(), tableX + 12, positionY);
    doc.text(item.producto, tableX + 70, positionY);
    doc.text(item.cantidad.toString(), tableX + 300, positionY); // Mover un poco a la derecha
    doc.text(item.precio.toString(), tableX + 370, positionY); // Mover un poco a la derecha
    doc.text(item.subtotal.toString(), tableX + 460, positionY); // Mover un poco a la derecha
  
    // Líneas divisorias entre filas
    doc.moveTo(tableX, positionY + 15).lineTo(tableX + 550, positionY + 15).stroke();
    positionY += 20;
  });

//Estado
const estadoBoxX = tableXInit + 230;
const estadoBoxY = positionYInit + 460;
const estadoBoxWidth = 157;
const estadoBoxHeight = 30;

doc.rect(estadoBoxX, estadoBoxY, estadoBoxWidth, estadoBoxHeight).stroke();
doc.font('Helvetica-Bold').fontSize(10).text('Estado:', estadoBoxX + 5, estadoBoxY + 10);
doc.font('Helvetica').text(EstadoEncontrado.Estado, estadoBoxX + 45, estadoBoxY + 10);

  // Total
  // Total en un recuadro al final del PDF a la derecha
  const totalBoxX = tableXInit + 390;
  const totalBoxY = positionYInit + 460;
  const totalBoxWidth = 157;
  const totalBoxHeight = 30;

  // Dibujar el recuadro para el total
  doc.rect(totalBoxX, totalBoxY, totalBoxWidth, totalBoxHeight).stroke();

  // Texto dentro del recuadro del total
  doc.font('Helvetica-Bold').fontSize(10).text('TOTAL:', totalBoxX + 5, totalBoxY + 10);
  doc.font('Helvetica').text(`$${totalOperacion.toFixed(2)} ARS`, totalBoxX + 45, totalBoxY + 10);


  //Gusto caseroo
  const gustoBoxX = tableXInit;
  const gustoBoxY = positionYInit + 510;
  const gustoBoxWidth = 550;
  const gustoBoxHeight = 30;

  doc.rect(gustoBoxX, gustoBoxY, gustoBoxWidth, gustoBoxHeight).stroke();
  doc.font('Helvetica-Bold').fontSize(10).text('"EL GUSTO CASERO"', gustoBoxX + 5, gustoBoxY + 10,
     { width: gustoBoxWidth - 10, height: gustoBoxHeight - 10, align: 'center', valign: 'center' });


  // Finalizar el documento
  doc.end();
  writableStream.on('finish', async () => {
    const pdfBuffer = Buffer.concat(buffers);

    // Actualizar el remito en la base de datos
    await Remito.update(
      { remitoPDF: pdfBuffer },
      { where: { Id_Remito: id } }
    );
});
}

export const obtenerRemitos = async (req, res) => {   
  try {
    const remitos = await Remito.findAll({
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

    // Enviamos solo una respuesta
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

// Exportar el controlador
export default { generarPDF, obtenerRemitos, obtenerPDF }; 
