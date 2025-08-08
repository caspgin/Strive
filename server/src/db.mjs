import { Client } from 'pg';
import config from './config.mjs';

export const client = new Client({
    ...config.database,
});

export const connectToDB = async () => {
    try {
        await client.connect();

        client.schema = config.database.schema;
        client.taskTable = config.tables.task_table;
        client.userTable = config.tables.user_table;
        client.listTable = config.tables.list_table;
        await client.query('SELECT current_database()');
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
