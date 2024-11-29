const express = require('express');
const router = express.Router();
const db = require('../data/database.js');
router.get('/', async (req, res) => {
    try {
        const manages = await db.getAllElements('manages');
        res.json(manages);
    } catch (error) {
        res.status(500).json({error: 'Erreur lors de la récupération des auteurs.'});
    }
});

module.exports = router;