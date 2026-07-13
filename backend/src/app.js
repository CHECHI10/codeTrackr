const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const helmet = require("helmet");
const { env } = require("./config/env");
const authRoutes = require("./routes/auth.routes");
const problemRoutes = require("./routes/problem.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const { notFound, errorHandler } = require("./middleware/error.middleware");

const app = express();

app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    if (!origin || env.clientUrls.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CodeTrackr API is healthy"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
