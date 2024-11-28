require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion :', err);
        return;
    }
    console.log('Connecté à la base de données MySQL');
});

function query(sql, params = []) {
    return new Promise((resolve, reject) => {
        connection.query(sql, params, (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}

async function getElementById(table, id) {
    const sql = `SELECT * FROM ${table} WHERE id = ?`;
    return await query(sql, [id]);
}

async function getAllElements(table) {
    const sql = `SELECT * FROM ${table}`;
    return await query(sql);
}

async function insertElement(table, data) {
    const sql = `INSERT INTO ${table} SET ?`;
    const result = await query(sql, data);
    return result.insertId;
}


async function updateElementById(table, id, data) {
    const sql = `UPDATE ${table} SET ? WHERE id = ?`;
    const result = await query(sql, [data, id]);
    return result.affectedRows;
}


async function deleteElementById(table, id) {
    const sql = `DELETE FROM ${table} WHERE id = ?`;
    const result = await query(sql, [id]);
    return result.affectedRows;
}

async function searchElementsByName(table, searchValue, fields = ['name']) {
    const conditions = fields.map(field => `${field} LIKE ?`).join(' OR ');
    const sql = `SELECT * FROM ${table} WHERE ${conditions}`;
    const params = fields.map(() => `%${searchValue}%`);
    return await query(sql, params);
}


module.exports = {
    getElementById,
    getAllElements,
    insertElement,
    updateElementById,
    deleteElementById,
    searchElementsByName,
    closeConnection: () => connection.end(),
};
