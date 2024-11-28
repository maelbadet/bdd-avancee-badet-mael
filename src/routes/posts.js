const express = require('express');
const router = express.Router();
const db = require('../data/database.js');

router.get('/', async (req, res) => {
    try {
        const posts = await db.getAllElements('posts');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des posts.' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await db.getElementById('posts', id);
        if (post.length === 0) {
            return res.status(404).json({ error: 'Post non trouvé.' });
        }
        res.json(post[0]);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du post.' });
    }
});

router.get('/search/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const posts = await db.searchElementsByName('posts', name, ['title','description']);
        if (posts.length > 0) {
            res.json(posts);
        } else {
            res.status(200).json({error: 'Aucun post trouvé avec ce titre ou description.'});
        }
    } catch (error) {
        console.error('Erreur lors de la recherche :', error);
        res.status(500).json({error: 'Erreur lors de la recherche des posts.'});
    }
});

router.post('/', async (req, res) => {
    try {
        const newPost = req.body;
        const newPostId = await db.insertElement('posts', newPost);
        res.status(201).json({ id: newPostId, message: 'Post créé avec succès.' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création du post.' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPost = req.body;
        const updatedRows = await db.updateElementById('posts', id, updatedPost);
        if (updatedRows === 0) {
            return res.status(404).json({ error: 'Post non trouvé.' });
        }
        res.json({ message: 'Post mis à jour avec succès.' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour du post.' });
    }
});

module.exports = router;