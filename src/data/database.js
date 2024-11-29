require('dotenv').config();
const mysql = require('mysql2/promise')

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

// fonction generale de l'evaluation'
async function getAllElements(table) {
    const sql = `SELECT *
                 FROM ${table}`;
    return await query(sql);
}

async function getElementById(table, id) {
    const sql = `SELECT *
                 FROM ${table}
                 WHERE id = ?`;
    return await query(sql, [id])
}

async function insertElement(table, data) {
    const sql = `INSERT INTO ${table}
                 SET ?`;
    const result = await query(sql, data);
    return result.insertId;
}

async function updateElement(table, id, data) {
    const sql = `UPDATE ${table}
                 SET ?
                 WHERE id = ?`;
    const result = await query(sql, [data, id]);
    return result.affectedRows;
}

async function deleteElementById(table, id) {
    const sql = `DELETE
                 FROM ${table}
                 WHERE id = ?`;
    const result = await query(sql, [id]);
    return result.affectedRows;
}

// fonction specifique a l'evaluation :

async function getManagerByService(serviceId) {
    const sql = `
        SELECT e.*
        FROM employees e
                 INNER JOIN manages m ON e.id = m.employee_id
        WHERE m.service_id = ?;
    `;
    return await query(sql, [serviceId]);
}

async function executeStoredProcedure(procedureName, params = []) {
    const placeholders = params.map(() => '?').join(', ');
    const sql = `CALL ${procedureName}(${placeholders});`;
    return await query(sql, params);
}

async function closeConnection() {
    await connection.end();
}

module.exports =
    {
        connection,
        getAllElements,
        getElementById,
        insertElement,
        updateElement,
        executeStoredProcedure,
        getManagerByService,
        deleteElementById,
        closeConnection,
    };