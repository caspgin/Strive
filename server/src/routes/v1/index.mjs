import { Router } from 'express';
import tasks from './tasks/index.mjs';

const v1 = Router();

v1.use('/tasks', tasks);

export default v1;
