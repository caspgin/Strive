import { configDotenv } from 'dotenv';

configDotenv();

const config = {
	development: {
		port: parseInt(process.env.DEV_PORT || 3000),
		database: {
			host: process.env.DEV_DB_PGHOST,
			port: parseInt(process.env.DEV_DB_PGPORT),
			database: process.env.DEV_DB_PGNAME,
			user: process.env.DEV_DB_PGUSER,
			password: process.env.DEV_DB_PASSWORD,
		},
		dbTaskSchema: {
			schema: process.env.DEV_DB_TASK_SCHEMA,
			table: process.env.DEV_DB_TASK_TABLE,
		},
		dbUserSchema: {
			schema: process.env.DEV_DB_USER_SCHEMA,
			table: process.env.DEV_DB_USER_TABLE,
		},
	},
	production: { port: 4000 },
};

export default config[process.env.NODE_ENV];
