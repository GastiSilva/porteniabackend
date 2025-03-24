import Proveedor from '../models/Proveedor.js';
import sequelize from '../config.js'
import bcrypt from 'bcrypt';

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