import { Client } from 'pg';
import config from './config.mjs';

export const client = new Client({
    ...config.database,
});

export const connectToDB = async () => {
    try {
        await client.connect();
        client.schema = config.dbSchema.schema;
        client.table = config.dbSchema.table;
        const r = await client.query('SELECT current_database()');
        console.log(r.rows, client.schema);
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
