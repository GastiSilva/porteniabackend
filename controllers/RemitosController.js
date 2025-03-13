import PDFDocument from 'pdfkit';

// Función para generar y enviar el PDF
export const generarPDF= (req, res) => {
  const doc = new PDFDocument();

  // Configurar los encabezados de la respuesta para la descarga del PDF
  res.setHeader('Content-disposition', 'attachment; filename=remito_fabrica.pdf');
  res.setHeader('Content-type', 'application/pdf');

  // Pipe el PDF a la respuesta
  doc.pipe(res);

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
  doc.text('DIA:     MES:      AÑO:   ', textRightMarginX, textRightPositionY, { align: 'left' });

  // Cuadro de información del cliente, justo debajo de los dos cuadros con poca separación
  const cuadroDatosX = cuadroIzquierdoX;
  const cuadroDatosY = cuadroIzquierdoY + cuadroIzquierdoHeight + 10;
  const cuadroDatosWidth = cuadroDerechoX + cuadroDerechoWidth - cuadroIzquierdoX;
  const cuadroDatosHeight = 50;

  // Dibujar el cuadro de información del cliente
  doc.rect(cuadroDatosX, cuadroDatosY, cuadroDatosWidth, cuadroDatosHeight).stroke();

  // Texto dentro del cuadro de información del cliente
  const textDatosX = cuadroDatosX + 10;
  let textDatosY = cuadroDatosY + 10;
  doc.text('SEÑOR(ES): ________________________________________________________', textDatosX, textDatosY, { align: 'left' });
  textDatosY += 15;
  doc.text('DOMICILIO: ________________________________________________________', textDatosX, textDatosY, { align: 'left' });

  // Línea separadora
  doc.moveTo(20, cuadroDatosY + cuadroDatosHeight + 10).lineTo(550, cuadroDatosY + cuadroDatosHeight + 10).stroke();

  // Encabezado de la tabla con cuadros alrededor de cada columna
  const tableTop = cuadroDatosY + cuadroDatosHeight + 30;
  const tableX = cuadroIzquierdoX;

  // Dibujar cuadros para los encabezados de la tabla y agregar texto en negrita
  doc.font('Helvetica-Bold').fontSize(10);
  const headerHeight = 15;
  
  doc.rect(tableX, tableTop, 100, headerHeight).stroke(); // Cuadro para "CÓDIGO"
  doc.text('CÓDIGO', tableX + 5, tableTop + 3);

  doc.rect(tableX + 100, tableTop, 150, headerHeight).stroke(); // Cuadro para "PRODUCTO"
  doc.text('PRODUCTO', tableX + 105, tableTop + 3);

  doc.rect(tableX + 250, tableTop, 100, headerHeight).stroke(); // Cuadro para "CANTIDAD"
  doc.text('CANTIDAD', tableX + 255, tableTop + 3);

  doc.rect(tableX + 350, tableTop, 100, headerHeight).stroke(); // Cuadro para "PRECIO UNITARIO"
  doc.text('PRECIO UNITARIO', tableX + 355, tableTop + 3);

  doc.rect(tableX + 450, tableTop, 100, headerHeight).stroke(); // Cuadro para "SUBTOTAL"
  doc.text('SUBTOTAL', tableX + 455, tableTop + 3);

  // Dibujar líneas extendidas para la tabla
  const tableEndY = 700;
  doc.font('Helvetica'); // Volver a la fuente regular para el contenido de la tabla
  let positionY = tableTop + 20;

  // Líneas de productos
  const productData = [
    { codigo: '001', producto: 'Producto 1', cantidad: 10, precio: 100, subtotal: 1000 },
    { codigo: '002', producto: 'Producto 2', cantidad: 5, precio: 200, subtotal: 1000 },
    { codigo: '003', producto: 'Producto 3', cantidad: 2, precio: 300, subtotal: 600 }
  ];

  productData.forEach((item) => {
    doc.text(item.codigo, tableX + 5, positionY);
    doc.text(item.producto, tableX + 105, positionY);
    doc.text(item.cantidad, tableX + 255, positionY);
    doc.text(item.precio, tableX + 355, positionY);
    doc.text(item.subtotal, tableX + 455, positionY);

    // Líneas divisorias entre filas
    doc.moveTo(tableX, positionY + 15).lineTo(tableX + 550, positionY + 15).stroke();
    positionY += 20;
  });

  // Total
  // Total en un recuadro al final del PDF a la derecha
  const totalBoxX = tableX + 390;
  const totalBoxY = positionY + 400;
  const totalBoxWidth = 157;
  const totalBoxHeight = 30;

  // Dibujar el recuadro para el total
  doc.rect(totalBoxX, totalBoxY, totalBoxWidth, totalBoxHeight).stroke();

  // Texto dentro del recuadro del total
  doc.font('Helvetica-Bold').fontSize(10).text('TOTAL:', totalBoxX + 5, totalBoxY + 10);
  doc.font('Helvetica').text('_____________', totalBoxX + 45, totalBoxY + 10);


  //Gusto caseroo
  const gustoBoxX = tableX;
  const gustoBoxY = positionY + 450;
  const gustoBoxWidth = 550;
  const gustoBoxHeight = 30;

  // Dibujar el recuadro para el Gusto caseroo
  doc.rect(gustoBoxX, gustoBoxY, gustoBoxWidth, gustoBoxHeight).stroke();

  // Texto dentro del recuadro del Gusto caseroo
  doc.font('Helvetica-Bold').fontSize(10).text('"EL GUSTO CASERO"', gustoBoxX + 5, gustoBoxY + 10,
     { width: gustoBoxWidth - 10, height: gustoBoxHeight - 10, align: 'center', valign: 'center' });


  // Finalizar el documento
  doc.end();
};

// Exportar el controlador
export default { generarPDF };  
