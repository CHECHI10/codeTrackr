const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const ApiError = require("../utils/apiError");
const asyncHandler = require("../utils/asyncHandler");
const { env } = require("../config/env");

const protect = asyncHandler(async (req, res, next) => {
  const bearerToken = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.split(" ")[1]
    : null;
  const token = req.cookies?.token || bearerToken;

  if (!token) {
    throw new ApiError(401, "Authentication required");
  }

  let decoded;

  try {
    decoded = jwt.verify(token, env.jwtSecret);
  } catch (error) {
    throw new ApiError(401, "Invalid or expired token");
  }

  const user = await User.findById(decoded.id);

  if (!user) {
    throw new ApiError(401, "Authenticated user no longer exists");
  }

  req.user = user;
  next();
});

module.exports = {
  protect
};
