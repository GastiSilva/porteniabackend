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
  
export default { guardarIVACompra };