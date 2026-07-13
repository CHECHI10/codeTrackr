const ApiError = require("../utils/apiError");

const validate = (schema) => (req, res, next) => {
  const result = schema(req);

  if (result.errors.length > 0) {
    throw new ApiError(400, "Validation failed", result.errors);
  }

  req.validated = {
    ...(req.validated || {}),
    ...result.value
  };

  next();
};

module.exports = validate;
