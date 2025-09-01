import { InvalidIdError } from '../error/customErrors.mjs';
import { List } from '../tasks/taskSchema.mjs';
import { idValidation } from '../tasks/taskServiceValidation.mjs';
import * as listRepository from './listRepository.mjs';

export const getAll = async (request, response) => {
    try {
        const result = await listRepository.getAllLists();
        response.status(200).json(result);
    } catch (error) {
        response.status(500).json({ err: error.message });
    }
};

export const getListTasks = async (request, response) => {
    try {
        const { listid } = request.params || null;
        idValidation(listid);
        const result = await listRepository.getListTasks(listid);
        response.status(200).json(result);
    } catch (error) {
        if (error instanceof InvalidIdError) {
            response.status(error.statusCode).json({ err: error.message });
        }
        response.status(500).json({ err: error.message });
    }
};

export const createList = async (request, response) => {
    try {
        const { name } = request.params || null;
        if (!name) {
            return response.status(400).json({ err: 'no valid name give' });
        }
        const list = List({ name });
        const result = await listRepository.createList(list);

        response.status(201).json(result[0]);
    } catch (error) {}
};
