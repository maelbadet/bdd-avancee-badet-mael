const express = require('express');
const router = express.Router();
const db = require('../data/database.js');

router.get('/', async (req, res) => {
    try {
        const employees = await db.getAllElements('employees');
        res.json(employees);
    } catch (error) {
        res.status(500).json({error: 'Erreur lors de la récupération des auteurs.'});
    }
});

module.exports = router;