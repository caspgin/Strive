import * as taskService from './tasks/taskService.mjs';
import * as listService from './lists/listService.mjs';

export const createTask = async (request, response, next) => {
    try {
        const { task } = request.body || {};

        //create Task
        const taskResult = await taskService.create(task);
        //Update list's numoftasks
        await listService.incrementNumOfTasks(task.listid);
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
        await listService.decrementNumOfTasks(result.listid);
        response.status(200).json({ deleteCount: result.rowCount });
    } catch (error) {
        next(error);
    }
};

export const updateTaskbyId = async (request, response, next) => {
    try {
        const { id } = request.params || null;
        const { task } = request.body || null;
        const result = await taskService.update(id, task);
        return response.status(200).json(result);
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

export const getTasksByListId = async (request, response, next) => {
    try {
        const { listid } = request.params || null;
        const result = await listService.getAllTasks(listid);
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
