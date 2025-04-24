import { Client } from 'pg';
import config from './config.mjs';

const client = new Client({
	...config.database,
});

client
	.connect()
	.then(() => console.log('connected to PG'))
	.catch((err) => console.error('Connection error', err.stack));

export default client;
