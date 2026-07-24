export function notFoundHandler(req, res) {
  res.status(404).json({ mensaje: 'Recurso no encontrado' });
}

export function errorHandler(err, req, res, next) {
  console.error('Error no controlado:', err);

  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).json({ mensaje: 'Error interno del servidor' });
}
