const express = require("express");
const connectDB = require("./src/config/db");       // remonte d'un niveau
const taskRoutes = require("./src/routes/taskRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());

// Connexion MongoDB
connectDB();

// Routes
app.use("/tasks", taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
