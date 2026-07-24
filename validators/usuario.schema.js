import { z } from 'zod';

export const loginSchema = z.object({
  Usuario: z.string().trim().min(1, 'El usuario es requerido'),
  Contrasenia: z.string().min(1, 'La contraseña es requerida'),
});

export const registerSchema = z.object({
  Usuario: z.string().trim().min(3, 'El usuario debe tener al menos 3 caracteres'),
  Contrasenia: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  Mail: z.string().trim().email('Mail invalido'),
});
