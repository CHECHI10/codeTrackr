const mongoose = require("mongoose");
const { env } = require("../config/env");

const connectDB = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
