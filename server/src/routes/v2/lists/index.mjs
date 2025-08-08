import { Router } from 'express';
import * as listService from './listService.mjs';

const lists = Router();

lists.get('/', listService.getAll);
lists.get('/:listid/tasks', listService.getListTasks);
export default lists;
