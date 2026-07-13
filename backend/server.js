require("dotenv").config({ quiet: true });
const { validateEnv, env } = require("./src/config/env");
const app = require("./src/app");
const connectDB = require("./src/db/db");

validateEnv();

connectDB();

app.listen(env.port, () => {
  console.log(`Server running on port ${env.port}`);
});
