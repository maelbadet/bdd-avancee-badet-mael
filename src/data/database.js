require('dotenv').config();
const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

async function query(sql, params = []) {
    const [results] = await connection.query(sql, params);
    return results;
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

async function closeConnection() {
    await connection.end();
}


module.exports = {
    connection,
    getElementById,
    getAllElements,
    insertElement,
    updateElementById,
    deleteElementById,
    searchElementsByName,
    closeConnection,
};
