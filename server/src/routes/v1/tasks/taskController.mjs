import { request, response } from 'express';

export const create = (request, response) => {
	response.send('created');
};

export const remove = (request, response) => {
	response.send('deleted');
};
