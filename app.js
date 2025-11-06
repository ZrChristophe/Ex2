// app.js
require('dotenv').config(); // charge les variables d'environnement
const express = require('express');
const tasksRouter = require('./routes/tasks');
const connectDB = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Connexion à MongoDB avant de démarrer le serveur
connectDB().then(() => {
  console.log('MongoDB connecté, démarrage du serveur...');

  app.use(express.json());

  // Route d'accueil
  app.get('/', (req, res) => {
    res.json({ message: 'API ToDoList — utilisez /tasks pour voir les tâches' });
  });

  // Routes tasks
  app.use('/tasks', tasksRouter);

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
  });

  // Error handler
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  });

  // Lancement du serveur
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Impossible de connecter à MongoDB:', err.message);
});
