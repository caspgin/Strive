import express from 'express';
import v1 from './routes/v1/index.mjs';
export const createServer = () => {
	const app = express();
	app.use(express.json());
	app.use('/v1', v1);
	return app;
};
