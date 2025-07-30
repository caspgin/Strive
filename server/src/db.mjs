import { Client } from 'pg';
import config from './config.mjs';

export const client = new Client({
	...config.database,
});

export const connectToDB = async () => {
	try {
		await client.connect();
		client.task = {};
		client.user = {};
		client.task.schema = config.dbTaskSchema.schema;
		client.task.table = config.dbTaskSchema.table;
		client.user.schema = config.dbUserSchema.schema;
		client.user.table = config.dbUserSchema.table;
		const r = await client.query('SELECT current_database()');
		console.log('DB connected');
	} catch (error) {
		console.log('DB connection failed', error.message);
		console.log(error.stack);

		console.log('Shutting down... ');
		process.exit(1);
	}
};

export const closeDB = async () => {
	try {
		console.log('DB Disconnecting');
		await client.end();
		console.log('DB Disconnected');
	} catch (err) {
		console.log('Db Disconnection failed', err);
	}
};
