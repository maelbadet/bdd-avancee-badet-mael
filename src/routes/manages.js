const express = require('express');
const router = express.Router();
const db = require('../data/database.js');
router.get('/', async (req, res) => {
    try {
        const manages = await db.getAllElements('manages');
        res.json(manages);
    } catch (error) {
        res.status(500).json({error: 'Erreur lors de la récupération du manager.'});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const author = await db.getElementById('manages', id);
        if (author.length === 0) {
            return res.status(404).json({
                error: "aucun auteur trouver avec cette ID"
            })
        } else {
            res.status(201).json(author[0]);
        }
    } catch (error) {
        res.status(500).json({
            error: "erreur lors de la recuperation du manager"
        })
    }
});

router.get('/service/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const managerByService = await db.getManagerByService(id);
        if (managerByService.length === 0) {
            return res.status(404).json({
                error: "aucun auteur trouver avec ce nom de service"
            })
        } else {
            res.status(201).json(managerByService[0]);
        }
    } catch (error) {
        res.status(500).json({
            error: "erreur lors de la recuperation du manager"
        })
    }
});

router.post('/', async (req, res) => {
    try {
        const newManager = req.body;
        const newAuthorId = await db.insertElement('manager', newManager);
        res.status(201).json({id: newAuthorId, message: 'manager créé avec succès.'});
    } catch (error) {
        res.status(500).json({error: 'Erreur lors de la création du manager.'});
    }
});

router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const updateManages = req.body;
        const updateRows = await db.updateElement('manages', id, updateManages );
        if (updateRows === 0){
            return res.status(400).json({
                message: "aucun manager trouver",
            })
        }
        res.status(201).json({
            message: "nombres de colonnes modifier" + updateRows,
        })
    }
    catch (error){
        res.status(500).json({
            error: "erreur lors de la recuperation du manager"
        });
    }
});

router.get('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const elementToDelete = await db.getElementById('manages', id);
        if (!elementToDelete) {
            return res.status(404).json({ message: "Manager introuvable." });
        }
        const affectedRows = await db.deleteElementById('manages', id);
        if (affectedRows === 0) {
            return res.status(500).json({ message: "Erreur : l'élément n'a pas été supprimé." });
        }
        res.status(200).json({ id, message: "Manager supprimé avec succès." });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression du manager." });
    }
});

module.exports = router;