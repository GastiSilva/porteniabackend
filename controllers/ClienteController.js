import Clientes from '../models/Clientes.js';
import sequelize from '../config.js'


export const registrarCliente = async (req, res) => {
    const { Nombre, Cuil } = req.body;

    
    try {
    const clienteExistente = await Clientes.findOne({
      where: sequelize.where(
        sequelize.fn('LOWER', sequelize.col('Nombre')),
        Nombre.toLowerCase()
      )
    });
  
      if (clienteExistente) {
        return res.status(400).json({ mensaje: 'El cliente ya existe' });
      }
  
      const nuevoCliente = await Clientes.create({
        Nombre: Nombre,
        Cuil
      });
  
      return res.status(201).json({ mensaje: 'cliente registrado exitosamente', cliente: nuevoCliente });
    } catch (error) {
      console.error('Error del servidor:', error);
      return res.status(500).json({ mensaje: 'Error del servidor' });
    }
  };