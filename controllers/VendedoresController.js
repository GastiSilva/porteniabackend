import Vendedores from '../models/Vendedores.js';
import sequelize from '../config.js'


export const registrarVendedor = async (req, res) => {
    const { Nombre, Cuit } = req.body;

    
    try {
    const vendedorExistente = await Vendedores.findOne({
      where: sequelize.where(
        sequelize.fn('LOWER', sequelize.col('Nombre')),
        Nombre.toLowerCase()
      )
    });
  
      if (vendedorExistente) {
        return res.status(400).json({ mensaje: 'El vendedor ya existe' });
      }
  
      const nuevoVendedor = await Vendedores.create({
        Nombre: Nombre,
        Cuit
      });
  
      return res.status(201).json({ mensaje: 'Vendedor registrado exitosamente', vendedor: nuevoVendedor });
    } catch (error) {
      console.error('Error del servidor:', error);
      return res.status(500).json({ mensaje: 'Error del servidor' });
    }
  };