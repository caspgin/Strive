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
        dbSchema: {
            schema: process.env.DEV_DB_SCHEMA,
            table: process.env.DEV_DB_TABLE,
        },
    },
    production: { port: 4000 },
    test: {
        port: 5000,
        database: {
            host: process.env.TEST_DB_PGHOST,
            port: parseInt(process.env.TEST_DB_PGPORT),
            dbname: process.env.TEST_DB_PGNAME,
            user: process.env.TEST_DB_PGUSER,
            password: process.env.TEST_DB_PASSWORD,
        },
    },
};

export default config[process.env.NODE_ENV];
