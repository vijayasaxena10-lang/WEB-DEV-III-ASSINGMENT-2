// Centralized error-handling middleware.
// Express identifies error middleware by its four parameters.
const errorHandler = (err, req, res, next) => {
  console.error(err.stack || err.message);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    statusCode,
    message: err.message || "Internal Server Error"
  });
};

module.exports = errorHandler;
