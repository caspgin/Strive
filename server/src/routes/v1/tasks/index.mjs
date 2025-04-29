import { Router } from 'express';
import * as taskController from './taskController.mjs';

const tasks = Router();

tasks.post('/create', taskController.create);
tasks.get('/:id', taskController.getById);
tasks.get('/', taskController.getAll);
tasks.delete('/delete/:id', taskController.remove);
tasks.put('/update/:id', taskController.editbyId);

export default tasks;
