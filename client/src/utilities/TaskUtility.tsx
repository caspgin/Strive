import { TaskType } from '../types/types';
import { v4 as uuidv4 } from 'uuid';

export interface RawTaskType {
    name: string;
    parentid: number | null;
    completed?: boolean;
    description?: string;
    id?: number;
    date?: string;
    time?: string;
}
export function normalizeTask(data: RawTaskType): TaskType {
    const task: TaskType = {
        uuid: uuidv4(),
        name: data.name,
        parentid: data.parentid,
        id: data.id,
        description: data.description,
        date: data.date ? new Date(data.date) : null,
    };

    if (data.time) {
        const hours = Number(data.time.split(':')[0]);
        const minutes = Number(data.time.split(':')[1]);

        task.time = { hours, minutes };
    }
    return task;
}

export function normalizeTaskArray(dataArray: []): TaskType[] {
    if (!dataArray) {
        return [];
    } else {
        return dataArray.map((data) => normalizeTask(data));
    }
}
export function buildSortedTaskHeirachy(flatTasks: TaskType[]) {
    const subTasks: TaskType[] = [];
    const regularTasks: TaskType[] = [];
    flatTasks.forEach((task) => {
        if (task.parentid) {
            subTasks.push(task);
        } else {
            regularTasks.push(task);
        }
    });

    const sortedTaskHeirachy: TaskType[] = [];
    regularTasks.forEach((task) => {
        sortedTaskHeirachy.push(task);
        subTasks.forEach((subTask) => {
            if (subTask.parentid == task.id) {
                sortedTaskHeirachy.push(subTask);
            }
        });
    });
    return sortedTaskHeirachy;
}
