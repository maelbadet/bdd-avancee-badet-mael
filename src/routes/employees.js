const express = require('express');
const router = express.Router();
const db = require('../data/database.js');

router.get('/', async (req, res) => {
    try {
        const employees = await db.getAllElements('employees');
        res.json(employees);
    } catch (error) {
        res.status(500).json({error: 'Erreur lors de la récupération des employees.'});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const author = await db.getElementById('employees', id);
        if (author.length === 0) {
            return res.status(404).json({
                error: "aucun employees trouver avec cette ID"
            })
        } else {
            res.status(201).json(author[0]);
        }
    } catch (error) {
        res.status(500).json({
            error: "erreur lors de la recuperation de l'employees"
        })
    }
});

router.post('/', async (req, res) => {
    try {
        const newEmployee = req.body;
        const newEmployeeId = await db.insertElement('employees', newEmployee);
        res.status(201).json({id: newEmployeeId, message: 'employer créé avec succès.'});
    } catch (error) {
        res.status(500).json({error: "Erreur lors de la création de l'auteur."});
    }
});

router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params
        const updateEmployee = req.body;
        const updateRows = await db.updateElement('employees', id, updateEmployee);
        if (updateRows === 0) {
            return res.status(400).json({
                message: "aucun employee trouver",
            })
        }
        res.status(201).json({
            message: "nombres de colonnes modifier" + updateRows,
        })
    } catch (error) {
        res.status(500).json({
            error: "erreur lors de la recuperation de l'employee"
        });
    }
});

router.get('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const elementToDelete = await db.getElementById('employees', id);
        if (!elementToDelete) {
            return res.status(404).json({ message: "Employer introuvable." });
        }
        const affectedRows = await db.deleteElementById('employees', id);
        if (affectedRows === 0) {
            return res.status(500).json({ message: "Erreur : l'élément n'a pas été supprimé." });
        }
        res.status(200).json({ id, message: "Employer supprimé avec succès." });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression de l'employer." });
    }
});


module.exports = router;