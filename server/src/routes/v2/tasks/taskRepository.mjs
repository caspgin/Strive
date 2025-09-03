//TASK REPOSITORY

import { client } from '../../../db.mjs';

export const createTask = async (task) => {
    const columns = Object.keys(task);
    const positionalParams = columns.map((_, index) => `$${index + 1}`);

    const query = `INSERT INTO ${client.schema}.${client.taskTable} (${columns.join()}) VALUES (${positionalParams.join()}) RETURNING * `;

    const values = columns.map((column) => {
        return task[column];
    });

    const result = await client.query(query, values);
    return result.rows[0];
};

export const updateTask = async (id, task) => {
    const columns = Object.keys(task);
    const setClause = columns
        .map((field, index) => `${field} = $${index + 1}`)
        .join(',');
    const query = `UPDATE ${client.schema}.${client.taskTable} SET ${setClause} WHERE id = $${columns.length + 1} RETURNING *`;

    const values = columns.map((field) => task[field]);
    values.push(id);
    const result = await client.query(query, values);

    return result.rows[0];
};

export const getAllTasks = async () => {
    const query = `SELECT * FROM ${client.schema}.${client.taskTable}`;
    const result = await client.query(query);

    return result.rows;
};

export const deleteTask = async (id) => {
    const query = `DELETE FROM ${client.schema}.${client.taskTable} WHERE id = $1 RETURNING *`;

    const values = [id];

    const result = await client.query(query, values);
    return {
        rowCount: result.rowCount,
        listid: result.rows[0].listid,
    };
};

export const getTaskById = async (id) => {
    const query = `SELECT * FROM ${client.schema}.${client.taskTable} WHERE id = $1`;
    const result = await client.query(query, [id]);

    return result.rows[0];
};
