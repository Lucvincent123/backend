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

// Ajouter une nouvelle catégorie
router.post('/', async (req, res) => {
    const { name, image, code } = req.body;
    try {
        const newCategory = new Category({ name, image, code });
        await newCategory.save();
        res.status(201).json({ success: true, data: newCategory });
    } catch (error) {
        console.error("Erreur lors de l'ajout :", error);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
});

module.exports = router;
