const express = require('express');
const router = express.Router();
const db = require('../data/database.js');

router.get('/', async (req, res) => {
    try {
        const services = await db.getAllElements('services');
        res.json(services);
    } catch (error) {
        res.status(500).json({error: 'Erreur lors de la récupération du services.'});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const author = await db.getElementById('services', id);
        if (author.length === 0) {
            return res.status(404).json({
                error: "aucun services trouver avec cette ID"
            })
        } else {
            res.status(201).json(author[0]);
        }
    } catch (error) {
        res.status(500).json({
            error: "erreur lors de la recuperation du services"
        })
    }
});

router.post('/', async (req, res) => {
    try {
        const newServices = req.body;
        const newAuthorId = await db.insertElement('services', newServices);
        res.status(201).json({id: newAuthorId, message: 'service créé avec succès.'});
    } catch (error) {
        res.status(500).json({error: 'Erreur lors de la création du service.'});
    }
});

router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const updateServices = req.body;
        const updateRows = await db.updateElement('services', id, updateServices );
        if (updateRows === 0){
            return res.status(400).json({
                message: "aucun services trouver",
            })
        }
        res.status(201).json({
            message: "nombres de colonnes modifier" + updateRows,
        })
    }
    catch (error){
        res.status(500).json({
            error: "erreur lors de la recuperation du services"
        });
    }
});

router.get('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const elementToDelete = await db.getElementById('services', id);
        if (!elementToDelete) {
            return res.status(404).json({ message: "Service introuvable." });
        }
        const affectedRows = await db.deleteElementById('services', id);
        if (affectedRows === 0) {
            return res.status(500).json({ message: "Erreur : l'élément n'a pas été supprimé." });
        }
        res.status(200).json({ id, message: "Services supprimé avec succès." });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression du Service." });
    }
});

module.exports = router;