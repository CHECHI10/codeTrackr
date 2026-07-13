const ApiError = require("../utils/apiError");

const notFound = (req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
};

const errorHandler = (error, req, res, next) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || "Internal server error";
  let details = error.details || null;

  if (error.name === "ValidationError") {
    statusCode = 400;
    message = "Validation failed";
    details = Object.values(error.errors).map((item) => item.message);
  }

  if (error.name === "CastError") {
    statusCode = 400;
    message = "Invalid resource id";
  }

  if (error.code === 11000) {
    statusCode = 409;
    const fields = Object.keys(error.keyPattern || {});
    message = `${fields.join(", ") || "Resource"} already exists`;
  }

  const response = {
    success: false,
    message
  };

  if (details) {
    response.details = details;
  }

  if (process.env.NODE_ENV !== "production") {
    response.stack = error.stack;
  }

  res.status(statusCode).json(response);
};

module.exports = {
  notFound,
  errorHandler
};
