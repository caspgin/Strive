import { client } from '../../../db.mjs';
import { ChangeTaskType } from '../tasks/taskSchema.mjs';

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

export const getPendingTasks = async (listid) => {
	const query = `SELECT * FROM ${client.schema}.${client.taskTable} WHERE listid = $1 AND completed = $2`;

	const values = [listid, 'false'];
	const response = await client.query(query, values);
	return response.rows;
};

export const getRecentCompletedTasks = async (listid, num_of_tasks) => {
	const query = `SELECT * FROM ${client.schema}.${client.taskTable} WHERE listid = $1 AND completed = $2 ORDER BY completion_date DESC LIMIT ${num_of_tasks}`;
	const values = [listid, true];

	const response = await client.query(query, values);
	return response.rows;
};

export const createList = async (list) => {
	const columns = Object.keys(list);
	const positionalParams = columns.map((_, index) => `$${index + 1}`);

	const query = `INSERT INTO ${client.schema}.${client.listTable} (${columns.join()}) VALUES(${positionalParams.join()}) RETURNING * `;

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
	const columns = Object.keys(list);
	const setParams = columns
		.map((key, index) => `${key} = $${index + 1} `)
		.join();
	const query = `UPDATE ${client.schema}.${client.listTable} SET ${setParams} WHERE id = $${columns.length + 1} RETURNING * `;

	const values = columns.map((key) => list[key]);
	values.push(id);
	const result = await client.query(query, values);
	return result.rows[0];
};

export const updateIndividualTaskCount = async (id, taskType) => {
	let column, increment;

	switch (taskType) {
		case ChangeTaskType.DEL_PENDING:
			column = 'num_of_pending_tasks';
			increment = '- 1';
			break;
		case ChangeTaskType.DEL_COMPLETED:
			column = 'num_of_completed_tasks';
			increment = '- 1';
			break;
		case ChangeTaskType.ADD_PENDING:
			column = 'num_of_pending_tasks';
			increment = '+ 1';
			break;
		case ChangeTaskType.ADD_COMPLETED:
			column = 'num_of_completed_tasks';
			increment = '+ 1';
			break;
	}

	const query = `UPDATE ${client.schema}.${client.listTable} SET "${column}" = "${column}" ${increment} WHERE id = ${id} RETURNING * `;
	const result = await client.query(query);
	return result.rows[0];
};

export const updateBothTaskCount = async (id, taskType) => {
	let completed, pending;

	switch (taskType) {
		case ChangeTaskType.COMPLETED_TO_PENDING:
			pending = '+ 1';
			completed = '- 1';
			break;
		case ChangeTaskType.PENDING_TO_COMPLETED:
			pending = '- 1';
			completed = '+ 1';
			break;
	}

	const query = `UPDATE ${client.schema}.${client.listTable} SET num_of_pending_tasks = num_of_pending_tasks ${pending}, num_of_completed_tasks = num_of_completed_tasks ${completed} WHERE id = ${id} RETURNING * `;
	const result = await client.query(query);
	return result.rows[0];
};
