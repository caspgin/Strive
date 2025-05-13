import { createServer } from './server.mjs';
import config from './config.mjs';
import { client, connectToDB } from './db.mjs';

const app = createServer();

const server = app.listen(config.port, async () => {
    console.log(`Listening on ${config.port}`);

    await connectToDB();
    console.log('Connection');
});

process.on('SIGINT', () => {
    (async () => {
        console.log('Received SIGINT, shutting down...');
        try {
            console.log('woeking');
            const res = await client.end();
            console.log('DB disconnected', res);
        } catch (error) {
            console.log('Failure disconnecting', error.message);
        } finally {
            // Close the server
            server.close(() => {
                console.log('Server closed');
                process.exit(0); // Exit gracefully
            });
        }
    })();
});
