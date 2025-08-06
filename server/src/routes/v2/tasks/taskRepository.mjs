//TASK REPOSITORY

import { client } from '../../../db.mjs';

export const createTask = async (task) => {
    const columns = Object.keys(task);

    const query = `INSERT INTO ${client.task.schema}.${client.task.table} (${columns.join()}) VALUES (${columns.map((_, index) => `$${index + 1}`).join()}) RETURNING * `;

    const values = columns.map((column) => {
        return task[column];
    });

    const result = await client.query(query, values);
    return result.rows;
};

export const updateTask = async (id, task) => {
    const columns = Object.keys(task);
    const setClause = columns
        .map((field, index) => `${field} = $${index + 1}`)
        .join(',');
    const query = `UPDATE ${client.task.schema}.${client.task.table} SET ${setClause} WHERE id = $${columns.length + 1} RETURNING *`;

    const values = columns.map((field) => task[field]);
    values.push(id);
    const result = await client.query(query, values);

    return result.rows;
};

export const getAllTasks = async () => {
    const query = `SELECT * FROM ${client.task.schema}.${client.task.table}`;
    const result = await client.query(query);

    return result.rows;
};

export const deleteTask = async (id) => {
    const query = `DELETE FROM ${client.task.schema}.${client.task.table} WHERE id = $1`;

    const values = [id];

    const result = await client.query(query, values);
    console.log('result in repo', result);
    return result.rowCount;
};

export const getTaskById = async (id) => {
    const query = `SELECT * FROM ${client.task.schema}.${client.task.table} WHERE id = $1`;
    const result = await client.query(query, [id]);

    return result.rows;
};
