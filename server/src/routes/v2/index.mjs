import { Router } from 'express';
import tasks from './tasks/index.mjs';
import authRouter from './auth/auth.mjs';
import lists from './lists/index.mjs';

const v2 = Router();

v2.use('/auth/', authRouter);
v2.use('/tasks', tasks);
v2.use('/lists', lists);
export default v2;
