const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); 
require('dotenv').config();

const authRoutes = require('./routes/auth');
const survey = require('./routes/surveyRoute');

const app = express();

app.use(cors());
app.use(express.json());

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connecté à MongoDB'))
    .catch(err => console.error('❌ Erreur de connexion MongoDB:', err));

app.use('/api/auth', authRoutes);
app.use('/api/surveys', survey);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur lancé sur le port ${PORT}`));