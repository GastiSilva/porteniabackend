import IVACompras from "../models/IVACompras.js";
import Clientes from '../models/Clientes.js';
import Proveedor from '../models/Proveedor.js';
import sequelize from '../config.js';

export const guardarIVACompra = async (req, res) => {
  try {
    const { ivaCompras, cliente, proveedor } = req.body;

    if (!ivaCompras) {
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
    const nuevaCompra = await IVACompras.create({
      Fecha: ivaCompras.Fecha,
      Factura: ivaCompras.Factura,
      Factura_N: ivaCompras.Factura_N,
      Id_Cliente: idCliente,
      Id_Proveedor: idProveedor,
      CondicionIva: ivaCompras.CondicionIva,
      Neto: ivaCompras.Neto,
      IVA21: ivaCompras.IVA21,
      IVA10_5: ivaCompras.IVA10_5,
      PercIVA: ivaCompras.PercIVA,
      ConceptosNoAgravados: ivaCompras.ConceptosNoAgravados,
      Flete10_5: ivaCompras.Flete10_5,
      PercepcionesCba: ivaCompras.PercepcionesCba,
      PercepcionesIIBB: ivaCompras.PercepcionesIIBB,
      ImporteTotal: ivaCompras.ImporteTotal
    });

    return res.status(201).json({
      message: 'IVA Compra guardada con éxito',
      ivaCompras: nuevaCompra
    });

  } catch (error) {
    console.error('Error al guardar IVA Compra:', error);
    return res.status(500).json({
      message: 'Error al guardar IVA Compra',
      error: error.message
    });
  }
};

export async function modificarIVACompras(req, res) {
  try {
    const { Id_IvaCompras } = req.params;
    const { Factura, Factura_N, Neto, IVA21, IVA10_5, PercIVA, IngrBrutosRefEfect, ConceptosNoAgravados, Flete10_5, PercepcionesCba, PercepcionesIIBB, ImporteTotal } = req.body;

    if (!Id_IvaCompras || (!Factura_N && !CondicionIva && !Neto && !IVA21 && !IVA10_5 && !PercIVA && !ImporteTotal
      && !IngrBrutosRefEfect && !ConceptosNoAgravados && !Flete10_5 && !PercepcionesCba && !PercepcionesIIBB)) {
      return res.status(400).json({ message: "Datos insuficientes para realizar la actualización." });
    }

    const ivacompras = await IVACompras.findByPk(Id_IvaCompras);

    if (!ivacompras) {
      return res.status(404).json({ message: "Iva compras no encontrado." });
    }


    if (Factura) ivacompras.Factura = Factura;
    if (Factura_N) ivacompras.Factura_N = Factura_N;
    if (Neto) ivacompras.Neto = limpiarNumero(Neto);
    if (IVA21) ivacompras.IVA21 = limpiarNumero(IVA21);
    if (IVA10_5) ivacompras.IVA10_5 = limpiarNumero(IVA10_5);
    if (PercIVA) ivacompras.PercIVA = limpiarNumero(PercIVA);
    if (IngrBrutosRefEfect) ivacompras.IngrBrutosRefEfect = limpiarNumero(IngrBrutosRefEfect);
    if (ConceptosNoAgravados) ivacompras.ConceptosNoAgravados = limpiarNumero(ConceptosNoAgravados);
    if (Flete10_5) ivacompras.Flete10_5 = limpiarNumero(Flete10_5);
    if (PercepcionesCba) ivacompras.PercepcionesCba = limpiarNumero(PercepcionesCba);
    if (PercepcionesIIBB) ivacompras.PercepcionesIIBB = limpiarNumero(PercepcionesIIBB);
    if (ImporteTotal) ivacompras.ImporteTotal = limpiarNumero(ImporteTotal);


    await ivacompras.save();

    res.status(200).json({ message: "IvaCompras actualizado correctamente.", ivacompras });
  } catch (error) {
    console.error("Error al modificar el ivacompras:", error);
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

export default { guardarIVACompra, modificarIVACompras };