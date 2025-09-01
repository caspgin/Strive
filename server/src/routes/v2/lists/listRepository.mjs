import { client } from '../../../db.mjs';

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
    return result.rows;
};
