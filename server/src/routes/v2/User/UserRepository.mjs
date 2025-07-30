export const createUser = async (user) => {
	const columns = Object.keys(user);
	const query = `INSERT INTO ${client.user.schema}.${client.user.table} (${columns.join()}) VALUES (${columns.map((_, index) => `$${index + 1}`).join()}) RETURNING * `;
	const values = columns.map((column) => user[column]);

	const result = client.query(query, values);

	return result;
};

export const getUserByEmail = async (email) => {
	const query = `SELECT * FROM ${client.user.schema}.${client.user.table} `;
};
