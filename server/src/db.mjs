import { Client } from 'pg';
import config from './config.mjs';

export const client = new Client({
	...config.database,
});

export const connectToDB = async () => {
	try {
		await client.connect();
		console.log('DB connected');
	} catch (error) {
		console.log('DB connection failed', error.message);
		console.log(error.stack);

		console.log('Shutting down... ');
		process.exit(1);
	}
};
