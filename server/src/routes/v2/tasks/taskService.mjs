//TASK SERVICE MODULE

import * as taskRepository from './taskRepository.mjs';
import { Task } from './taskSchema.mjs';
import { idValidation } from './taskServiceValidation.mjs';
import {
	ParentTaskNotFoundError,
	ParentIsSubError,
} from './../error/customErrors.mjs';

//create
export const create = async (taskData) => {
	//create Task object with proper data and keys
	const task = new Task(taskData);
	//if task is subTask check parentTask exists and valid
	if (task.parentid != null) {
		const parentTask = await getTaskById(task.parentid);
		if (!parentTask) {
			throw new ParentTaskNotFoundError(
				'Invalid parent task. Task creation Failed',
			);
		}
		//Only 1 level of subTasks i.e. a subtask cannot have subTasks yet
		if (parentTask.parentid != null) {
			throw new ParentIsSubError('Parent task cannot be a sub task');
		}
	}
	const result = await taskRepository.createTask(task);
	return result;
};

//update

export const update = async (id, taskData) => {
	const task = new Task(taskData);
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
