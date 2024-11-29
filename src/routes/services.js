const express = require('express');
const router = express.Router();
const db = require('../data/database.js');

router.get('/', async (req, res) => {
    try {
        const services = await db.getAllElements('services');
        res.json(services);
    } catch (error) {
        res.status(500).json({error: 'Erreur lors de la récupération des auteurs.'});
    }
});

module.exports = router;