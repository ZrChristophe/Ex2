// app.js
require('dotenv').config(); // lit le fichier .env
const express = require('express');
const tasksRouter = require('./routes/tasks');
const connectDB = require('./db'); // import de la connexion DB

const app = express();
const PORT = process.env.PORT || 3000;

// Connexion à MongoDB
connectDB();

app.use(express.json());

// route d'accueil simple
app.get('/', (req, res) => {
  return res.json({ message: 'API ToDoList — utilisez /tasks pour voir les tâches' });
});

app.use('/tasks', tasksRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// démarrage du serveur
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
