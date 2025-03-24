import express from 'express';
import { autenticar, registrar } from '../controllers/UsuarioController.js';

const router = express.Router();

// Ruta de autenticación
router.post('/login', autenticar);
router.post('/register', registrar);


export default router;
