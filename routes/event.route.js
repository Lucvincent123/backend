const express = require('express');
const event = require('../database/models/event'); // Import du modèle Event
const router = express.Router();

// Route pour récupérer tous les événements
router.get('/', async (req, res) => {
    try {
        const events = await event.find(); // Récupérer tous les événements dans la base de données
        res.json(events); // Retourner les événements au format JSON
    } catch (error) {
        console.error('Erreur lors de la récupération des événements:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des événements' });
    }
});

module.exports = router;
