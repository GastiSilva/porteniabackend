import express from 'express';
import  {generarPDF}  from '../controllers/RemitosController.js';
import {crearRemito} from '../controllers/CrearRemitoController.js';

const router = express.Router();

// Ruta de autenticación
router.get('/generarRemito/:id', generarPDF);

router.post('/altaRemitos', crearRemito);

export default router;
