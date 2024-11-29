const express = require('express');
const router = express.Router();
const db = require('../data/database.js');

router.get('/:name', async (req, res) => {
    try {
        const {name} = req.params;
        const storedProcedure = await db.executeStoredProcedure(name);
        res.json(storedProcedure[0]);
    } catch (error) {
        res.status(500).json({error: 'Erreur lors de la récupération du services.'});
    }
});

module.exports = router;