const requiredEnv = ["MONGO_URI", "JWT_SECRET"];

const validateEnv = () => {
  const missing = requiredEnv.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }
};

const getAllowedOrigins = () => {
  const rawOrigins = process.env.CLIENT_URL || "http://localhost:5173";

  return rawOrigins
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
};

module.exports = {
  validateEnv,
  env: {
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
    nodeEnv: process.env.NODE_ENV || "development",
    clientUrls: getAllowedOrigins()
  }
};
