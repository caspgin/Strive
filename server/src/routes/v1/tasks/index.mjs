import { Router } from 'express';
import * as taskController from './taskController.mjs';

const tasks = Router();

tasks.post('/create', taskController.create);
tasks.delete('/delete', taskController.remove);

export default tasks;
