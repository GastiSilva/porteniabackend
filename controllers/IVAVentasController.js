import sequelize from '../config.js';
import IVAVentas from '../models/IVAVentas.js';
import Clientes from '../models/Clientes.js';
import Proveedor from '../models/Proveedor.js';

export const obtenerEstructuraIVAVentas = async (req, res) => {
  try {
    // Consulta para obtener la estructura de la tabla IVAVentas, excluyendo claves foráneas
    const estructuraIVAVentasQuery = `
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_name = 'IVAVentas' 
        AND table_schema = 'public'
        AND column_name NOT LIKE 'Id_%'
        AND column_name NOT LIKE 'id_%';
      `;
    const [estructuraIVAVentas] = await sequelize.query(estructuraIVAVentasQuery);

    // Consultas para obtener las estructuras de las tablas relacionadas, excluyendo claves foráneas
    const tablasRelacionadas = ['Clientes', 'Proveedor'];
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
      IVAVentas: estructuraIVAVentas,
      ...estructurasRelacionadas
    });
  } catch (error) {
    console.error('Error al obtener la estructura de las tablas:', error);
    res.status(500).json({ error: 'Error al obtener la estructura de las tablas', details: error.message });
  }
};

export const guardarIVAVenta = async (req, res) => {
  try {
    const { ivaVenta, cliente, proveedor } = req.body;

    if (!ivaVenta) {
      return res.status(400).json({ message: 'Datos de IVA Venta incompletos' });
    }

    let idCliente = null;
    let idProveedor = null;

    // Validamos si vino cliente o proveedor (no ambos)
    if (cliente && cliente.id_Cliente) {
      const clienteExistente = await Clientes.findByPk(cliente.id_Cliente);
      if (!clienteExistente) {
        return res.status(400).json({ message: 'Cliente no válido' });
      }
      idCliente = cliente.id_Cliente;
    } else if (proveedor && proveedor.id_Proveedor) {
      const proveedorExistente = await Proveedor.findByPk(proveedor.id_Proveedor);
      if (!proveedorExistente) {
        return res.status(400).json({ message: 'Proveedor no válido' });
      }
      idProveedor = proveedor.id_Proveedor;
    } else {
      return res.status(400).json({ message: 'Debe incluir un cliente o un proveedor' });
    }

    // Crear la venta
    const nuevaVenta = await IVAVentas.create({
      Fecha: ivaVenta.Fecha,
      Factura: ivaVenta.Factura,
      Factura_N: ivaVenta.Factura_N,
      Id_Cliente: idCliente,
      Id_Proveedor: idProveedor,
      CondicionIva: ivaVenta.CondicionIva,
      Neto: ivaVenta.Neto,
      IVA21: ivaVenta.IVA21,
      IVA10_5: ivaVenta.IVA10_5,
      Retenciones: ivaVenta.Retenciones,
      ImporteTotal: ivaVenta.ImporteTotal
    });

    return res.status(201).json({
      message: 'IVA Venta guardada con éxito',
      ivaVenta: nuevaVenta
    });

  } catch (error) {
    console.error('Error al guardar IVA Venta:', error);
    return res.status(500).json({
      message: 'Error al guardar IVA Venta',
      error: error.message
    });
  }
};

export async function modificarIVAVentas(req, res) {
  try {
    const { Id_IvaVentas } = req.params;
    const { Factura, Factura_N, Neto, IVA21, IVA10_5, Retenciones, ImporteTotal } = req.body;

    if (!Id_IvaVentas || (!Factura_N && !CondicionIva && !Neto && !IVA21 && !IVA10_5 && !Retenciones && !ImporteTotal)) {
      return res.status(400).json({ message: "Datos insuficientes para realizar la actualización." });
    }

    const ivaventas = await IVAVentas.findByPk(Id_IvaVentas);

    if (!ivaventas) {
      return res.status(404).json({ message: "Iva ventas no encontrado." });
    }


    if (Factura) ivaventas.Factura = Factura;
    if (Factura_N) ivaventas.Factura_N = Factura_N;
    if (Neto) ivaventas.Neto = limpiarNumero(Neto);
    if (IVA21) ivaventas.IVA21 = limpiarNumero(IVA21);
    if (IVA10_5) ivaventas.IVA10_5 = limpiarNumero(IVA10_5);
    if (Retenciones) ivaventas.Retenciones = limpiarNumero(Retenciones);
    if (ImporteTotal) ivaventas.ImporteTotal = limpiarNumero(ImporteTotal);


    await ivaventas.save();

    res.status(200).json({ message: "IvaVentas actualizado correctamente.", ivaventas });
  } catch (error) {
    console.error("Error al modificar el ivaventas:", error);
    return res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
}

function limpiarNumero(valor) {
  if (typeof valor === 'string') {
    return parseFloat(
      valor.replace(/\$/g, '').replace(/\./g, '').replace(',', '.').trim()
    );
  }
  return valor;
}


export default {
  obtenerEstructuraIVAVentas,
  guardarIVAVenta,
  modificarIVAVentas
}