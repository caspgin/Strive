import { Router } from 'express';
import tasks from './tasks/index.mjs';
import authRouter from './auth/auth.mjs';

const v2 = Router();

v2.use('/auth/', authRouter);
v2.use('/tasks', tasks);

export default v2;
