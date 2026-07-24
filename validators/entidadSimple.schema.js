import { z } from 'zod';

// Cliente, Proveedor y Vendedor comparten la misma forma: Nombre + un identificador fiscal.
export const clienteSchema = z.object({
  Nombre: z.string().trim().min(1, 'El nombre es requerido'),
  Cuil: z.string().trim().min(1, 'El CUIL es requerido'),
});

export const proveedorSchema = z.object({
  Nombre: z.string().trim().min(1, 'El nombre es requerido'),
  Cuit: z.string().trim().min(1, 'El CUIT es requerido'),
});

export const vendedorSchema = z.object({
  Nombre: z.string().trim().min(1, 'El nombre es requerido'),
  Cuit: z.string().trim().min(1, 'El CUIT es requerido'),
});

export const productoSchema = z.object({
  Codigo: z.string().trim().min(1, 'El codigo es requerido'),
  Nombre: z.string().trim().min(1, 'El nombre es requerido'),
});
