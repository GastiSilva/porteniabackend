import express from 'express';
import  {generarPDF}  from '../controllers/RemitosController.js';

const router = express.Router();

// Ruta de autenticación
router.post('/generarRemito', generarPDF);

export default router;
