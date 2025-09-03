import { client } from '../../../db.mjs';
import { List } from '../tasks/taskSchema.mjs';

export const getAllLists = async () => {
    const query = `SELECT * FROM ${client.schema}.${client.listTable}`;
    const response = await client.query(query);
    return response.rows;
};

export const getListTasks = async (listid) => {
    const query = `SELECT * FROM ${client.schema}.${client.taskTable} WHERE listid = $1`;
    const values = [listid];
    const response = await client.query(query, values);
    return response.rows;
};

export const createList = async (list) => {
    const columns = Object.keys(list);
    const positionalParams = columns.map((_, index) => `$${index + 1}`);

    const query = `INSERT INTO ${client.schema}.${client.listTable} (${columns.join()}) VALUES (${positionalParams.join()}) RETURNING * `;

    const values = columns.map((column) => list[column]);
    const result = await client.query(query, values);
    return result.rows[0];
};

export const deleteList = async (id) => {
    const query = `DELETE FROM ${client.schema}.${client.listTable} WHERE id = $1`;
    const values = [id];
    const result = await client.query(query, values);
    return result.rowCount;
};

export const updateList = async (id, list) => {
    const columns = Object.keys(List);
    const setParams = columns.map((key, index) => `${key} = $${index + 1}`);

    const query = `UPDATE ${client.schema}.${client.listTable} SET ${setParams} WHERE id = ${columns.length + 1} RETURNING *`;

    const values = columns.map((key) => list[key]);
    values.push(id);

    const result = await client.query(query, values);
    return result.rows[0];
};

export const incrementTask = async (id) => {
    const query = `UPDATE ${client.schema}.${client.listTable} SET "numoftasks" = "numoftasks" + 1 WHERE id = ${id} RETURNING *`;
    const result = await client.query(query);
    return result.rows[0];
};
export const decrementTask = async (id) => {
    const query = `UPDATE ${client.schema}.${client.listTable} SET "numoftasks" = "numoftasks" - 1 WHERE id = ${id} RETURNING *`;
    const result = await client.query(query);
    return result.rows[0];
};
