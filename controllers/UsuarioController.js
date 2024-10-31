  import bcrypt from 'bcrypt';
  import Usuario from '../models/Usuario.js'; 

  export const autenticar = async (req, res) => {
    const { Usuario: nombreUsuario, Contrasenia } = req.body;
    //console.log('Datos recibidos en req.body:', req.body);
    try {
      const usuario = await Usuario.findOne({ where: { Usuario: nombreUsuario } });
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

