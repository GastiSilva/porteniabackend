import express from 'express';
import { obtenerEstados } from '../controllers/EstadoController.js';

const router = express.Router();

router.get('/estadosTodos', obtenerEstados);

export default router;