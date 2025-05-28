import * as taskService from './taskService.mjs';

export const create = async (request, response) => {
    try {
        const { task } = request.body || {};
        const result = await taskService.create(task);
        response.status(201).json(result);
    } catch (error) {
        response.status(500).json({ err: error.message });
    }
};

export const getById = async (request, response) => {
    try {
        const { id } = request.params || null;
        const result = await taskService.viewById(id);
        response.status(200).json(result);
    } catch (error) {
        response.status(500).json({ err: error.message });
    }
};

export const getAll = async (request, response) => {
    try {
        const result = await taskService.viewAll();
        response.status(200).json(result);
    } catch (error) {
        response.status(500).json({ err: error.message });
    }
};

export const remove = async (request, response) => {
    try {
        const { id } = request.params;
        const result = await taskService.remove(id);
        response.status(204).json({ deleteCount: result });
    } catch (error) {
        response.status(500).json({ err: error.message });
    }
};

export const editbyId = async (request, response) => {
    try {
        const { id } = request.params || null;
        const { task } = request.body || null;
        const result = await taskService.update({ id, ...task });
        return response.status(200).json(result);
    } catch (error) {
        response.status(500).json({ err: error.message });
    }
};
