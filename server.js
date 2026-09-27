const express = require("express");

const studentRoutes = require("./routes/studentRoutes");
const requestLogger = require("./middleware/requestLogger");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

// Built-in middleware: parse JSON request bodies
app.use(express.json());

// Custom middleware: log incoming requests
app.use(requestLogger);

// API routes
app.use("/students", studentRoutes);

// Unsupported route handler
app.use((req, res, next) => {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

// Centralized error-handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Student Service API running at http://localhost:${PORT}`);
});
