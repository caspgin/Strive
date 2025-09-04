import { Router } from 'express';
import authRouter from './auth/auth.mjs';
import * as controller from './controller.mjs';
const v2 = Router();

v2.use('/auth/', authRouter);

v2.use((req, res, next) => {
    console.log(`New Request :${req.path} and ${req.method}`);
    next();
});
//Tasks Paths
v2.get('/tasks', controller.getAllTasks);
v2.post('/tasks', controller.createTask);
v2.get('/tasks/:id', controller.getTaskById);
v2.put('/tasks/:id', controller.updateTaskbyId);
v2.delete('/tasks/:id', controller.removeTaskById);

//Lists Paths
v2.get('/lists', controller.getAllLists);
v2.post('/lists', controller.createList);
v2.get('/lists/:listid/tasks', controller.getTasksByListId);
v2.put('/lists/:id', controller.updateList);
//404 Error
v2.use((req, res, next) => {
    const error = new Error('Not found');
    error.statusCode = 404;
    next(error);
});

//Error handling
v2.use((error, _, response) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    response.status(statusCode).json({ error: { message: message } });
});
export default v2;
