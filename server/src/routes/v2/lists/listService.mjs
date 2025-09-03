import { List } from '../tasks/taskSchema.mjs';
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
    const result = await listRepository.deleteList(listid);
    return result;
};

export const updateList = async (id, listData) => {
    const list = new List(listData);
    const result = await listRepository.updateList(id, list);
    return result;
};

export const incrementNumOfTasks = async (id) => {
    idValidation(id);
    return await listRepository.incrementTask(id);
};
export const decrementNumOfTasks = async (id) => {
    idValidation(id);
    return await listRepository.decrementTask(id);
};
