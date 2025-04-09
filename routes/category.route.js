const express = require('express');
const Category = require('../database/models/category');
const router = express.Router();

// Récupérer toutes les catégories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        console.error('Erreur lors de la récupération des catégories :', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const event = await Category.findById(id); // Récupérer tous les événements dans la base de données
        res.status(200).json({ success: true, data: event}); // Retourner les événements au format JSON
    } catch (error) {
        console.error('Erreur lors de la récupération des événements:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des événements' });
    }
});

// Ajouter une nouvelle catégorie
router.post('/', async (req, res) => {
    const { text, action, imageUrl } = req.body;
    try {
        const newCategory = new Category({ text, action, imageUrl });
        await newCategory.save();
        res.status(201).json({ success: true, data: newCategory });
    } catch (error) {
        console.error("Erreur lors de l'ajout :", error);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params 
    try {
        const event = await Category.findByIdAndUpdate(id, req.body)

        if (!event) {
            return res.status(404).json({ success: false, message: "Event not found" })
        }

        const updatedEvent = await Category.findById(id)
        return res.status(200).json({ success: true, data: updatedEvent })

    } catch (error) {
        return res.status(500).json({success: false, message: "Server error" })
    }
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params 
    try {
        const deletedEvent = await Category.findByIdAndDelete(id)

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
