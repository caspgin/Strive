import { configDotenv } from 'dotenv';

configDotenv();

const config = {
	development: {
		port: parseInt(process.env.PORT || 3000),
		database: {
			host: process.env.DEV_DB_PGHOST,
			port: parseInt(process.env.DEV_DB_PGPORT),
			dbname: process.env.DEV_DB_PGNAME,
			user: process.env.DEV_DB_PGUSER,
			password: process.env.DEV_DB_PASSWORD,
		},
	},
	production: { port: 4000 },
	test: { port: 5000 },
};

export default config[process.env.NODE_ENV];
