import express from 'express';
import sequelize from './config.js';
import cors from 'cors';
import bodyParser from 'body-parser';

//rutas
import usuariosRoutes from './routes/usurios.routes.js';
import remitosRoutes from './routes/remitos.routes.js';
import produccionRoutes from './routes/produccion.routes.js';
import productoRoutes from './routes/productos.routes.js';
import tablasRoutes from './routes/tablas.routes.js';
import estadosRoutes from './routes/estados.routes.js';
import devolucionroutes from './routes/devolucion.routes.js';
import ventamercaderiaroutes from './routes/ventamercaderia.routes.js';
import proveedoresroutes from './routes/proveedores.routes.js';
import vendedoresroutes from './routes/vendedores.routes.js';
import clientesroutes from './routes/clientes.routes.js';
import comprasroutes from './routes/compras.routes.js';
import ingresosroutes from './routes/ingresos.routes.js';
import egresosRoutes from './routes/egresos.routes.js';
import ivaVentasRoutes from './routes/ivaVentas.routes.js';

//modelos
// import './models/Usuario.js';
// import './models/Proveedor.js';
// import './models/Producto.js';
// import './models/VentasMercaderia.js';
// import './models/Devolucion.js';
// import './models/Produccion.js';
// import './models/Clientes.js';
// import './models/Estados.js';
// import './models/Vendedores.js';
// import './models/MateriaPrima.js';
// import './models/Concepto.js';
// import './models/Compras.js';
// import './models/IVACompras.js';
import './models/IVAVentas.js';
// import './models/Gastos.js';
// import './models/Egresos.js';
// import './models/EgresoGastosAsosiaciones.js';
// import './models/Ingresos.js'
// import './models/Remito.js';
// import './models/RemitoProducto.js';
// import './models/TipoGastos.js';


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
app.use('/api', produccionRoutes);
app.use('/api', productoRoutes);
app.use('/api', tablasRoutes);
app.use('/api', estadosRoutes);
app.use('/api', devolucionroutes);
app.use('/api', ventamercaderiaroutes);
app.use('/api', proveedoresroutes);
app.use('/api', vendedoresroutes);
app.use('/api', clientesroutes);
app.use('/api', comprasroutes);
app.use('/api', ingresosroutes);
app.use('/api', egresosRoutes);
app.use('/api', ivaVentasRoutes);



app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});


async function main() {
  try {
    await sequelize.sync();

  } catch (error) {
    console.log('Error al conectar con PostgreSQL:', error)

  }
}

main();

// Sincronizar todos los modelos con la base de datos

// Iniciar tu servidor aquí (por ejemplo, Express)

