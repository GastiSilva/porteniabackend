import express from 'express';
import sequelize from './config.js';
import cors from 'cors';
import bodyParser from 'body-parser';

//rutas
import usuariosRoutes from './routes/usurios.routes.js';
import remitosRoutes from './routes/remitos.routes.js';
// import exportsRoutes from './routes/exports.routes.js'

//modelos
import './models/Producto.js';
import './models/Usuario.js';
import './models/VentasMercaderia.js';
import './models/Devolucion.js';
import './models/Produccion.js';
import './models/Proveedor.js';
import './models/Solicitantes.js';
import './models/Clientes.js';
import './models/Vendedores.js';
import './models/Rubros.js';
import './models/Estados.js';
import './models/MateriaPrima.js';
import './models/Concepto.js';
import './models/IVAventas.js';
import './models/Compras.js';
import './models/IVAventasdiarias-ingresos.js';
// import './models/Remito.js';


const app = express();
const port = 3000;


app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:9000'
}));

//Rutas
app.get('/', (req, res) => {
  res.send('¡Hola, Express!');
});

app.use('/api', usuariosRoutes);
app.use('/api', remitosRoutes);



app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});


async function main() {
  try {
    await sequelize.sync();
    console.log('Conectado a PostgreSQL con Sequelize');

  } catch (error) {
    console.log('Error al conectar con PostgreSQL:', error)

  }
}

main();

// Sincronizar todos los modelos con la base de datos

// Iniciar tu servidor aquí (por ejemplo, Express)

