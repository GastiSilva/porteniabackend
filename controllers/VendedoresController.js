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

export const eliminarVendedor = async (req, res) => {
    const { Id_Vendedor } = req.body;
  
    try {
      const vendedor = await Vendedores.findByPk(Id_Vendedor);
  
      if (!vendedor) {
        return res.status(404).json({ mensaje: 'vendedor no encontrado' });
      }
  
      await vendedor.destroy();
  
      return res.status(200).json({ mensaje: 'vendedor eliminado exitosamente' });
    } catch (error) {
      console.error('Error del servidor:', error);
      return res.status(500).json({ mensaje: 'Error del servidor' });
    }
  };