import express from 'express';
import  {generarPDF}  from '../controllers/RemitosController.js';
import {crearRemito} from '../controllers/CrearRemitoController.js';

const router = express.Router();

// Ruta de autenticación
router.post('/generarRemito', generarPDF);

router.post('/altaRemitos', crearRemito);

export default router;
