import bcrypt from 'bcrypt';
import Usuario from '../models/Usuario.js'
import sequelize from '../config.js';


// Sincronizar la base de datos y agregar usuarios predefinidos si no existen
sequelize.sync().then(async () => {
  const usuariosPredefinidos = [
    {
      Usuario: 'Josefina24',
      Contrasenia: bcrypt.hashSync('moka24', 10),
    },
    {
      Usuario: 'gasti',
      Contrasenia: bcrypt.hashSync('test123', 10),
    },
    {
      Usuario: 'mati',
      Contrasenia: bcrypt.hashSync('test456', 10),
    }
  ];

  for (const usuario of usuariosPredefinidos) {
    const existeUsuario = await Usuario.findOne({ where: { Usuario: usuario.Usuario } });

    if (!existeUsuario) {
      await Usuario.create(usuario);
    } else {
      console.log(`Usuario ${usuario.Usuario} ya existe.`);
    }
  }
}).catch(error => {
  console.error('Error al sincronizar:', error);
});
