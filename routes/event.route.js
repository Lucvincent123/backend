const express = require('express');
const Event = require('../database/models/event'); // Import du modèle Event
const router = express.Router();

// Route pour récupérer tous les événements
router.get('/', async (req, res) => {
    try {
        const events = await Event.find(); // Récupérer tous les événements dans la base de données
        res.json(events); // Retourner les événements au format JSON
    } catch (error) {
        console.error('Erreur lors de la récupération des événements:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des événements' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const event = await Event.findById(id); // Récupérer tous les événements dans la base de données
        res.status(200).json({ success: true, data: event}); // Retourner les événements au format JSON
    } catch (error) {
        console.error('Erreur lors de la récupération des événements:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des événements' });
    }
});

router.post("/", async (req, res) => {
    const event = req.body;

    const newEvent = new Event(event);
    try {
        await newEvent.save();
        res.status(201).json({ success: true, data: newEvent })
    } catch (error) {
        console.error("Error in Create Event: ", error);
        res.status(500).json({ success: false, message: "Server error"})
    }
})

router.put("/:id", async (req, res) => {
    const { id } = req.params 
    try {
        const event = await Event.findByIdAndUpdate(id, req.body)

        if (!event) {
            return res.status(404).json({ success: false, message: "Event not found" })
        }

        const updatedEvent = await Event.findById(id)
        return res.status(200).json({ success: true, data: updatedEvent })

    } catch (error) {
        return res.status(500).json({success: false, message: "Server error" })
    }
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params 
    try {
        const deletedEvent = await Event.findByIdAndDelete(id)

        if (!deletedEvent) {
            return res.status(404).json({ success: false, message: "Event not found" })
        }

        // const updatedEvent = await Event.findById(id)
        return res.status(200).json({ success: true, data: deletedEvent })

    } catch (error) {
        return res.status(500).json({success: false, message: "Server error" })
    }
})

module.exports = router;
