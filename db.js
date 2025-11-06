// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Connexion à MongoDB avec l'URI du .env
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connecté avec succès !');
  } catch (err) {
    console.error('Erreur de connexion à MongoDB :', err.message);
    process.exit(1); // arrête l'application si la connexion échoue
  }
};

module.exports = connectDB;
