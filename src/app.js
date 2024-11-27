require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

function callStoredProcedure(authorId) {
    return new Promise((resolve, reject) => {
        const sql = 'CALL last_post_from_author(?)';
        connection.query(sql, [authorId], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results[0]);
        });
    });
}

function callFunction(nombre1, nombre2) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT addition(?, ?) AS result';
        connection.query(sql, [nombre1, nombre2], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results[0].result);
        });
    });
}


connection.connect(async (err) => {
    if (err) {
        console.error('Erreur de connexion :', err.stack);
        return;
    }

    connection.query('SELECT * FROM authors', (error, results) => {
        if (error) {
            console.error('Erreur lors de l’exécution de la requête :', error.stack);
        } else {
            console.log('Résultats :', results);
        }
    });

    try {
        const lastPost = await callStoredProcedure(1);
        console.log('Dernier post de l\'auteur :', lastPost);

        const additionResult = await callFunction(10, 20);
        console.log('Résultat de l\'addition :', additionResult);
    } catch (error) {
        console.error('Erreur lors de l\'exécution :', error);
    } finally {
        connection.end();
    }
});
