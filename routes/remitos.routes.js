import express from 'express';
import  {generarPDF, obtenerRemitos }  from '../controllers/RemitosController.js';
import {crearRemito} from '../controllers/CrearRemitoController.js';

const router = express.Router();

// Ruta de autenticación
router.get('/generarRemito/:id', generarPDF);

router.post('/altaRemitos', crearRemito);

router.get('/obtenerRemitos', obtenerRemitos);


export default router;
