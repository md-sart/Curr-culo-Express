
/**
 * Middleware global para tratamento de erros.
 */
const errorMiddleware = (err, req, res, next) => {
  console.error("Erro detectado:", err.stack || err);
  res.status(500).json({
    message: "Erro interno no servidor",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
};

export default errorMiddleware;
