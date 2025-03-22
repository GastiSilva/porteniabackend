import express from 'express';
import { obtenerEstadosTodos } from '../controllers/EstadoController.js';

const router = express.Router();

router.get('/estadosTodos', obtenerEstadosTodos);

export default router;