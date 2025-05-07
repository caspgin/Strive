import { client } from '../../../db.mjs';

export const create = async (request, response) => {
	try {
		// TODO: Validate and add the task to database

		const { name } = request.body || {};
		if (!name) {
			response.status(400).json({ error: 'task name can not be empty' });
		}

		const query = 'INSERT INTO tasks (name) VALUES ($1) RETURNING *';

		const values = [name];

		const res = await client.query(query, values);

		response.status(201).json(res.rows[0]);
	} catch (error) {
		response.status(500).json({ err: 'something went wrong' });
	}
};

export const getById = async (request, response) => {
	try {
		const id = request.params.id;
		const query = 'SELECT name FROM tasks WHERE id = $1';
		const values = [id];
		const result = await client.query(query, values);
		if (result.rowCount == 0) {
			return response.status(400).json({ error: 'Not a valid id' });
		}
		response.status(200).json(result.rows[0]);
	} catch (error) {
		response.status(500).json({ err: 'something went wrong' });
	}
};

export const getAll = async (request, response) => {
	try {
		const query = 'SELECT * FROM tasks';
		const result = await client.query(query);

		response.status(200).json(result.rows);
	} catch (error) {
		response.status(500).json({ err: 'something went wrong' });
	}
};

export const remove = async (request, response) => {
	try {
		const { id } = request.params;
		const idNum = Number(id);

		if (!idNum || !Number.isInteger(idNum)) {
			return response.status(400).json({ err: 'invalid id or type.' });
		}

		const query = 'DELETE FROM tasks WHERE id = $1';
		const values = [idNum];

		const result = await client.query(query, values);
		response.status(204).end();
	} catch (err) {
		response.status(500).end();
	}
};

export const editbyId = async (request, response) => {
	try {
		const { id } = request.params || null;
		const idNum = Number(id);

		const { name } = request.body || null;
		console.log(name);
		if (!idNum || !Number.isInteger(idNum) || !name) {
			return response
				.status(400)
				.json({ err: 'invalid id or invalid task.' });
		}

		const query = 'UPDATE tasks SET name = $1 WHERE id = $2 RETURNING *';
		const values = [name, idNum];
		const result = await client.query(query, values);

		if (!result.rowCount) {
			return response.status(204).end();
		}
		return response.status(200).json({ rows: result.rows[0] });
	} catch (error) {
		response.status(500).json({ err: 'something went wrong' });
	}
};
