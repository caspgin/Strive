import * as taskRepository from './taskRepository.mjs';
import { Task } from './taskSchema.mjs';
import { idValidation } from './taskServiceValidation.mjs';
import {
    ParentTaskNotFoundError,
    ParentIsSubError,
} from './../error/customErrors.mjs';
//create

export const create = async (taskData) => {
    const { name, date, time, completed, description, parentid } = taskData;
    const task = new Task(name, date, time, completed, description, parentid);
    if (parentid != null) {
        const parentTask = await getTaskById(parentid);
        if (!parentTask) {
            throw new ParentTaskNotFoundError(
                'Invalid parent task. Task creation Failed',
            );
        }
        if (parentTask.parentid != null) {
            throw new ParentIsSubError('Parent task cannot be a sub task');
        }
    }
    const result = await taskRepository.createTask(task);
    return result;
};

//update

export const update = async (taskData) => {
    const { id, name, date, time, completed, description } = taskData;

    const task = new Task(name, date, time, completed, description);

    const result = await taskRepository.updateTask(id, task);
    return result;
};

//delete

export const remove = async (id) => {
    idValidation(id);

    const count = await taskRepository.deleteTask(id);
    return count;
};

//view

export const getTaskById = async (id) => {
    idValidation(id);

    const result = await taskRepository.getTaskById(id);
    return result;
};

export const viewAll = async () => {
    return await taskRepository.getAllTasks();
};
