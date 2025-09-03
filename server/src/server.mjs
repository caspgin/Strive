import express from 'express';
import v1 from './routes/v1/index.mjs';
import v2 from './routes/v2/index.mjs';

export const createServer = () => {
    const app = express();
    app.use(express.json());
    app.use((req, res, next) => {
        console.log(`In Server New Request :${req.path} and ${req.method}`);
        next();
    });
    app.use('/v1', v1);
    app.use('/v2', v2);
    return app;
};
