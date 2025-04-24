import { createServer } from './server.mjs';
import config from './config.mjs';

const server = createServer();

server.listen(config.port, () => {
	console.log(`Listening on ${config.port}`);
});
