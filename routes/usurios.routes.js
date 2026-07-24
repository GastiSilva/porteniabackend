import express from 'express';
import { autenticar, registrar } from '../controllers/UsuarioController.js';
import { validate } from '../middleware/validate.js';
import { loginSchema, registerSchema } from '../validators/usuario.schema.js';

const router = express.Router();

// Ruta de autenticación
router.post('/login', validate(loginSchema), autenticar);
router.post('/register', validate(registerSchema), registrar);


export default router;
