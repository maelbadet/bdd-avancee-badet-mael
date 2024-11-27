require('dotenv').config();
const db = require('./data/database');

(async () => {
    try {
        const newAuthorId = await db.insertElement('authors', { first_name: 'prenom1', last_name: 'nom1', email:'test@test.fr',birthdate:'1975-11-11', added:'1989-03-19 00:18:44' });
        console.log('Nouvel auteur créé avec l\'ID :', newAuthorId);

        const multiplePostIds = await db.insertMultipleElements('posts', [
            { title: 'Post 1', description: 'Description 1', author_id: newAuthorId, content: 'sjvhdshdsilkhujsidfdisl', date:'2011-05-21' },
            { title: 'Post 2', description: 'Description 2', author_id: newAuthorId, content: 'shgiyfisdhvsdvh wshvsjkdgfvhwiusehsdjklvh dsh fewsdljk;fhe', date:'2021-07-12' },
        ]);
        console.log('ID du premier post créé parmi plusieurs :', multiplePostIds);

        const author = await db.getElementById('authors', newAuthorId);
        console.log('Auteur récupéré :', author);

        const allAuthors = await db.getAllElements('authors');
        console.log('Tous les auteurs :', allAuthors);

        const updatedRows = await db.updateElementById('authors', newAuthorId, { first_name: 'mael', last_name: 'badet', email:'maelbadet21@gmail.com',birthdate:'2002-08-26', added:'2024-11-27 16:05:22' });
        console.log('Nombre de lignes mises à jour :', updatedRows);

        const updatedauthor = await db.getElementById('authors', newAuthorId);
        console.log('Auteur mis a jour récupéré :', updatedauthor);

        const deletedRows = await db.deleteElementById('authors', newAuthorId);
        console.log('Nombre de lignes supprimées :', deletedRows);

    } catch (error) {
        console.error('Erreur :', error);
    } finally {
        db.closeConnection();
    }
})();
