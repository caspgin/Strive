import { Router } from 'express';
import tasks from './tasks/index.mjs';

const v2 = Router();

v2.use('/tasks', tasks);

export default v2;
