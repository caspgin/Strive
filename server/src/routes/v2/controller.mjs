import * as taskService from './tasks/taskService.mjs';
import * as listService from './lists/listService.mjs';
import { ChangeTaskType } from './tasks/taskSchema.mjs';

export const createTask = async (request, response, next) => {
	try {
		const { task } = request.body || {};

		//create Task
		const taskResult = await taskService.create(task);
		//Update list's numoftasks
		await listService.updateTaskCount(
			task.listid,
			ChangeTaskType.ADD_PENDING,
		);
		response.status(201).json(taskResult);
	} catch (error) {
		next(error);
	}
};

export const getTaskById = async (request, response, next) => {
	try {
		const { id } = request.params || null;
		const result = await taskService.getTaskById(id);
		response.status(200).json(result);
	} catch (error) {
		next(error);
	}
};

export const getAllTasks = async (_, response, next) => {
	try {
		const result = await taskService.viewAll();
		response.status(200).json(result);
	} catch (error) {
		next(error);
	}
};

export const removeTaskById = async (request, response, next) => {
	try {
		const { id } = request.params || null;
		const result = await taskService.remove(id);
		await listService.updateTaskCount(
			result.listid,
			result.completed
				? ChangeTaskType.DEL_COMPLETED
				: ChangeTaskType.DEL_PENDING,
		);
		response.status(200).json({ deleteCount: result.rowCount });
	} catch (error) {
		next(error);
	}
};

export const updateTaskbyId = async (request, response, next) => {
	try {
		const { id } = request.params || null;
		const { task } = request.body || null;
		//Get the task value currently in DB
		const oldTask = await taskService.getTaskById(id);

		//Update the DB with the new task value
		const result = await taskService.update(id, task);

		//If a completion update then update the list's pending and completed tasks count
		//
		if (oldTask.completed != task.completed) {
			await listService.updateTaskCount(
				task.listid,
				task.completed
					? ChangeTaskType.PENDING_TO_COMPLETED
					: ChangeTaskType.COMPLETED_TO_PENDING,
			);
		}
		return response.status(200).json(result);
	} catch (error) {
		next(error);
	}
};

//Custom GET
//Returns all pending and numOfTasks most recent completed
export const getTasksByListId = async (request, response, next) => {
	try {
		const { listid } = request.params || null;
		const { num_of_tasks } = request.params || 0;

		const pendingTasks = await listService.getAllPendingTasks(listid);
		const completedTasks = await listService.getRecentCompletedTasks(
			listid,
			num_of_tasks,
		);
		const result = [...pendingTasks, ...completedTasks];
		response.status(200).json(result);
	} catch (error) {
		next(error);
	}
};

export const getAllLists = async (_, response, next) => {
	try {
		const result = await listService.getAllLists();
		response.status(200).json(result);
	} catch (error) {
		next(error);
	}
};

export const createList = async (request, response, next) => {
	try {
		const { name } = request.body || null;
		const result = await listService.create(name);
		response.status(201).json(result);
	} catch (error) {
		next(error);
	}
};

export const updateList = async (request, response, next) => {
	try {
		const { id } = request.params || null;
		const { list } = request.body || null;
		const result = await listService.updateList(id, list);
		response.status(200).json(result);
	} catch (error) {
		next(error);
	}
};

export const deleteList = async (request, response, next) => {
	try {
		const { id } = request.params || null;
		const result = await listService.deleteList(id);
		response.status(200).json(result);
	} catch (error) {
		next(error);
	}
};
