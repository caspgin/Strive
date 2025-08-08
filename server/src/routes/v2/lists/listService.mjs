import { InvalidIdError } from '../error/customErrors.mjs';
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
