const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
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

async function insertMultipleElements(table, dataArray) {
    const sql = `INSERT INTO ${table} (${Object.keys(dataArray[0]).join(', ')}) VALUES ?`;
    const values = dataArray.map((data) => Object.values(data));
    const result = await query(sql, [values]);
    return result.insertId;
}

async function updateElementById(table, id, data) {
    const sql = `UPDATE ${table} SET ? WHERE id = ?`;
    const result = await query(sql, [data, id]);
    return result.affectedRows;
}

async function updateMultipleElementsById(table, updates) {
    const promises = updates.map(({ id, data }) =>
        query(`UPDATE ${table} SET ? WHERE id = ?`, [data, id])
    );
    const results = await Promise.all(promises);
    return results.map((result) => result.affectedRows);
}

async function deleteElementById(table, id) {
    const sql = `DELETE FROM ${table} WHERE id = ?`;
    const result = await query(sql, [id]);
    return result.affectedRows;
}

async function deleteMultipleElementsByIds(table, ids) {
    const sql = `DELETE FROM ${table} WHERE id IN (?)`;
    const result = await query(sql, [ids]);
    return result.affectedRows;
}

module.exports = {
    getElementById,
    getAllElements,
    insertElement,
    insertMultipleElements,
    updateElementById,
    updateMultipleElementsById,
    deleteElementById,
    deleteMultipleElementsByIds,
    closeConnection: () => connection.end(),
};
