//import taskRepository
import * as taskRepository from './taskRepository.mjs';
import { Task } from './taskSchema.mjs';
import { idValidation } from './taskServiceValidation.mjs';

//create

export const create = async (taskData) => {
    const { name } = taskData;
    const task = new Task(name);
    const response = await taskRepository.createTask(task);
    return response.rows;
};

//update
//

export const update = async (taskData) => {
    const { id, name, time } = taskData;

    const task = new Task(name, time);

    const response = await taskRepository.updateTask(id, task);
    if (response.rowCount == 0) {
        throw new Error('invalid id or something went wrong. Update Failed');
    }
    return response.rows;
};

//delete

export const remove = async (id) => {
    idValidation(id);

    const response = await taskRepository.deleteTask(id);
    if (!response) {
        throw new Error('Something went Wrong');
    }
    return response.rowCount;
};

//view

export const viewById = async ({ id }) => {
    idValidation(id);

    const response = await taskRepository.getTask(id);

    if (!response.rowCount) {
        return response.rowCount;
    }
    return response.rows;
};

export const viewAll = async () => {
    return await taskRepository.getAllTasks();
};
