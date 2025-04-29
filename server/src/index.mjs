import { createServer } from './server.mjs';
import config from './config.mjs';
import { client, connectToDB } from './db.mjs';

const app = createServer();

const server = app.listen(config.port, async () => {
	console.log(`Listening on ${config.port}`);

	await connectToDB();
});

process.on('SIGINT', async () => {
	console.log('Recieved SIGINT, shutting down... ');
	server.close(() => {
		console.log('server closed');
	});
	try {
		await client.end();
		console.log('DB disconnected');
	} catch (error) {
		console.log('Failure disconnecting', error.message);
	}
	process.exit(1);
});
