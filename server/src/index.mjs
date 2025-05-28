import { createServer } from './server.mjs';
import config from './config.mjs';
import { connectToDB, closeDB } from './db.mjs';

const app = createServer();

const server = app.listen(config.port, async () => {
    console.log(`Listening on ${config.port}`);

    await connectToDB();
    console.log('Connection');
});

process.on('SIGINT', async () => {
    console.log('Received SIGINT, shutting down...');

    closeDB()
        .then(() => {
            server.close((err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('server closed');
                }
            });
        })
        .finally(() => {
            console.log('Shut');
        });
});
