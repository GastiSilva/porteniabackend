export function validate(schema) {
  return (req, res, next) => {
    const resultado = schema.safeParse(req.body);

    if (!resultado.success) {
      return res.status(400).json({
        mensaje: 'Datos invalidos',
        errores: resultado.error.issues.map((issue) => ({
          campo: issue.path.join('.'),
          detalle: issue.message,
        })),
      });
    }

    req.body = resultado.data;
    next();
  };
}
