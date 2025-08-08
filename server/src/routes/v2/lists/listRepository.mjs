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
