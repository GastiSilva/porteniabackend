import express from 'express';
//import  config  from './config/config.json'  assert { type: "json" };
import sequelize from './config.js';
import cors from 'cors';
import bodyParser from 'body-parser';

import usuariosRoutes from './routes/usurios.routes.js';

//modelos
import './models/Producto.js';
import './models/Usuario.js';
import './models/VentasMercaderia.js';
import './models/Proveedor.js';
import './models/Solicitantes.js';
import './models/Clientes.js';
import './models/Devolucion.js';
import './models/Produccion.js';
import './models/Vendedores.js';
import './models/Rubros.js';
import './models/Estados.js';


const app = express();
const port = 3000;


app.use(bodyParser.json());
app.use(cors({
  origin:'http://localhost:9000'
}));

//Rutas
app.get('/', (req, res) => {
    res.send('¡Hola, Express!');
});
app.use('/api', usuariosRoutes);



app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});


async function main() {
  try {
    await sequelize.sync();
    console.log('Conectado a PostgreSQL con Sequelize');
    
  } catch (error) {
    console.log('Error al conectar con PostgreSQL:', error )
    
  }
}

main();

// Sincronizar todos los modelos con la base de datos

// Iniciar tu servidor aquí (por ejemplo, Express)

