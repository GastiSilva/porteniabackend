import express from 'express';
import  {generarPDF, obtenerRemitos, obtenerPDF , eliminarRemito}  from '../controllers/RemitosController.js';
import {crearRemito} from '../controllers/CrearRemitoController.js';

const router = express.Router();

// Ruta de autenticación
router.get('/generarRemito/:id', generarPDF);
router.post('/altaRemitos', crearRemito);
router.get('/obtenerRemitos', obtenerRemitos);
router.post('/obtenerRemitoPDF', obtenerPDF);
router.delete('/EliminarRemito/:id', eliminarRemito);


export default router;
