import Proveedor from '../models/Proveedor.js';
import sequelize from '../config.js'


export const registrarProveedor = async (req, res) => {
    const { Nombre, Cuit } = req.body;

    
    try {
    const proveedorExistente = await Proveedor.findOne({
      where: sequelize.where(
        sequelize.fn('LOWER', sequelize.col('Nombre')),
        Nombre.toLowerCase()
      )
    });
  
      if (proveedorExistente) {
        return res.status(400).json({ mensaje: 'El proveedor ya existe' });
      }
  
      const nuevoProveedor = await Proveedor.create({
        Nombre: Nombre,
        Cuit
      });
  
      return res.status(201).json({ mensaje: 'Proveedor registrado exitosamente', proveedor: nuevoProveedor });
    } catch (error) {
      console.error('Error del servidor:', error);
      return res.status(500).json({ mensaje: 'Error del servidor' });
    }
  };


  export const eliminarProveedor = async (req, res) => {
    const { id_Proveedor } = req.body;
  
    try {
      const proveedor = await Proveedor.findByPk(id_Proveedor);
  
      if (!proveedor) {
        return res.status(404).json({ mensaje: 'proveedor no encontrado' });
      }
  
      await proveedor.destroy();
  
      return res.status(200).json({ mensaje: 'proveedor eliminado exitosamente' });
    } catch (error) {
      console.error('Error del servidor:', error);
      return res.status(500).json({ mensaje: 'Error del servidor' });
    }
  };