import bcrypt from 'bcrypt';
import Usuario from "../models/Usuario.js";
import sequelize from '../config.js';

export const autenticar = async (req, res) => {
  const { Usuario: nombreUsuario, Contrasenia } = req.body;
  try {
    const usuario = await Usuario.findOne({
      where: sequelize.where(
        sequelize.fn('LOWER', sequelize.col('Usuario')),
        nombreUsuario.toLowerCase()
      )
    });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const esValido = await bcrypt.compare(Contrasenia, usuario.Contrasenia);
    if (esValido) {
      return res.status(200).json({ mensaje: 'Autenticación exitosa', usuario });
    } else {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }
  } catch (error) {
    console.error('Error del servidor:', error);
    return res.status(500).json({ mensaje: 'Error del servidor' });
  }
};

export const registrar = async (req, res) => {
  const { Usuario: nombreUsuario, Contrasenia, Mail } = req.body;
  console.log('Modelo Usuario:', Usuario);
  console.log('Nombre de usuario recibido:', nombreUsuario);
  console.log("Datos llegados desde mi front", req.body);
  
  try {
    const usuarioExistente = await Usuario.findOne({
      where: sequelize.where(
        sequelize.fn('LOWER', sequelize.col('Usuario')),
        nombreUsuario.toLowerCase()
      )
    });

    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El usuario ya existe' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Contrasenia, salt);

    const nuevoUsuario = await Usuario.create({
      Usuario: nombreUsuario,
      Contrasenia: hashedPassword,
      Mail
    });

    return res.status(201).json({ mensaje: 'Usuario registrado exitosamente', usuario: nuevoUsuario });
  } catch (error) {
    console.error('Error del servidor:', error);
    return res.status(500).json({ mensaje: 'Error del servidor' });
  }
};


