const express = require('express');
const router = express.Router();
const db = require('../data/database.js');

router.get('/', async (req, res) => {
    try {
        const authors = await db.getAllElements('authors');
        res.json(authors);
    } catch (error) {
        res.status(500).json({error: 'Erreur lors de la récupération des auteurs.'});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const author = await db.getElementById('authors', id);
        if (author.length === 0) {
            return res.status(404).json({error: 'Auteur non trouvé.'});
        }
        res.json(author[0]);
    } catch (error) {
        res.status(500).json({error: 'Erreur lors de la récupération de l\'auteur.'});
    }
});

router.get('/search/:name', async (req, res) => {
    try {
        const {name} = req.params;
        const authors = await db.searchElementsByName('authors', name, ['first_name', 'last_name']);

        if (authors.length > 0) {
            res.json(authors);
        } else {
            res.status(200).json({
                error: 'Aucun auteur trouvé avec ce nom ou prénom.'
            });
        }
    } catch (error) {
        console.error('Erreur lors de la recherche :', error);
        res.status(500).json({error: 'Erreur lors de la recherche des auteurs.'});
    }
});


router.post('/', async (req, res) => {
    try {
        const newAuthor = req.body;
        const newAuthorId = await db.insertElement('authors', newAuthor);
        res.status(201).json({id: newAuthorId, message: 'Auteur créé avec succès.'});
    } catch (error) {
        res.status(500).json({error: 'Erreur lors de la création de l\'auteur.'});
    }
});

router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const updatedAuthor = req.body;
        const updatedRows = await db.updateElementById('authors', id, updatedAuthor);
        if (updatedRows === 0) {
            return res.status(404).json({error: 'Auteur non trouvé.'});
        }
        res.json({message: 'Auteur mis à jour avec succès.'});
    } catch (error) {
        res.status(500).json({error: 'Erreur lors de la mise à jour de l\'auteur.'});
    }
});

module.exports = router;