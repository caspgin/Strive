import { ChangeTaskType, List } from '../tasks/taskSchema.mjs';
import {
	idValidation,
	nameValidation,
} from '../tasks/taskServiceValidation.mjs';
import * as listRepository from './listRepository.mjs';

export const getAllTasks = async (listid) => {
	idValidation(listid);
	const result = await listRepository.getListTasks(listid);
	return result;
};

export const getAllPendingTasks = async (listid) => {
	idValidation(listid);
	return await listRepository.getPendingTasks(listid);
};

export const getRecentCompletedTasks = async (listid, numOfTasks) => {
	idValidation(listid);
	idValidation(numOfTasks);

	return await listRepository.getRecentCompletedTasks(listid, numOfTasks);
};
export const create = async (name) => {
	nameValidation(name);
	const list = new List({ name });
	const result = await listRepository.createList(list);
	return result;
};

export const getAllLists = async () => {
	const result = await listRepository.getAllLists();
	return result;
};

export const deleteList = async (id) => {
	idValidation(id);
	const result = await listRepository.deleteList(id);
	return result;
};

export const updateList = async (id, listData) => {
	const list = new List(listData);
	const result = await listRepository.updateList(id, list);
	return result;
};

export const updateTaskCount = async (id, taskType) => {
	idValidation(id);

	if (
		taskType === ChangeTaskType.COMPLETED_TO_PENDING ||
		taskType === ChangeTaskType.PENDING_TO_COMPLETED
	) {
		return await listRepository.updateBothTaskCount(id, taskType);
	} else {
		return await listRepository.updateIndividualTaskCount(id, taskType);
	}
};
