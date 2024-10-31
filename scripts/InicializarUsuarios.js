import bcrypt from 'bcrypt';
import Usuario from '../models/Usuario.js' // Asegúrate de que el path sea correcto
import sequelize from '../models/database/config.js'; // Conexión a la base de datos

// Sincronizar la base de datos y agregar usuarios predefinidos si no existen
sequelize.sync().then(async () => {
  const usuariosPredefinidos = [
    {
      Usuario: 'Josefina24',
      Contrasenia: bcrypt.hashSync('moka24', 10),
    },
    {
      Usuario: 'Gasti',
      Contrasenia: bcrypt.hashSync('test123', 10),
    }
  ];

  for (const usuario of usuariosPredefinidos) {
    const existeUsuario = await Usuario.findOne({ where: { Usuario: usuario.Usuario } });
    
    if (!existeUsuario) {
      await Usuario.create(usuario);
      console.log(`Usuario ${usuario.Usuario} creado.`);
    } else {
      console.log(`Usuario ${usuario.Usuario} ya existe.`);
    }
  }
}).catch(error => {
  console.error('Error al sincronizar:', error);
});
