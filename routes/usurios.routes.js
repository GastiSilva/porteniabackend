import express from 'express';
import { autenticar } from '../controllers/UsuarioController.js';

const router = express.Router();

// Ruta de autenticación
router.post('/login', autenticar);

export default router;
