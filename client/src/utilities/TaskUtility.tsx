import { ChangeTaskType, RawTaskType, SortBy, TaskType } from '../types/types';
import { v4 as uuidv4 } from 'uuid';

export function normalizeTask(data: RawTaskType): TaskType {
    const { time, date, completion_date, ...rest } = data;
    const task: TaskType = {
        ...rest,
        uuid: uuidv4(),
        date: null,
        time: null,
        completion_date: null,
    };
    if (date) {
        task.date = new Date(date);
    }
    if (time) {
        const hours = Number(time.split(':')[0]);
        const minutes = Number(time.split(':')[1]);

        task.time = { hours, minutes };
    }
    if (completion_date) {
        task.completion_date = new Date(completion_date);
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

function sortTaskList(list: TaskType[], sortby: SortBy) {
    switch (sortby) {
        case SortBy.Date:
            list.sort((a: TaskType, b: TaskType) => {
                if (!a.date) return 1;
                if (!b.date) return -1;
                const compareValue = a.date.getTime() - b.date.getTime();
                if (compareValue != 0) return compareValue;
                if (a.time && b.time) {
                    return (
                        (a.time.hours - b.time.hours) * 60 +
                        (a.time.minutes - b.time.minutes)
                    );
                }
                if (b.time && !a.time) return 1;
                if (a.time && !b.time) return -1;
                return 0;
            });
            break;

        case SortBy.Alphabetically:
            list.sort((a: TaskType, b: TaskType) => {
                return a.name.localeCompare(b.name);
            });
            break;

        case SortBy.UserOrder:
            list.sort((a: TaskType, b: TaskType) => {
                //Arrange Descending order, high sort order means higher in the list
                return b.sort_order - a.sort_order;
            });
            break;

        default:
            break;
    }
}

export function buildSortedTaskHeirachy(flatTasks: TaskType[], sortby: SortBy) {
    //Separating subTasks and regular tasks
    //
    //Subtask  is a map because one parent task can have multiple subTasks. number is parentTask id and TaskType[] is array of subtasks.
    const subTasks = new Map<number, TaskType[]>();
    const regularTasks: TaskType[] = [];
    flatTasks.forEach((task) => {
        if (task.parentid) {
            subTasks.set(task.parentid, [
                ...(subTasks.get(task.parentid) ?? []),
                task,
            ]);
        } else {
            regularTasks.push(task);
        }
    });
    //Sorting
    sortTaskList(regularTasks, sortby);
    subTasks.forEach((subtasks) => {
        sortTaskList(subtasks, sortby);
    });
    //making a final combined sortedTaskList
    const sortedTasksOut: TaskType[] = [];
    regularTasks.forEach((task) => {
        sortedTasksOut.push(task);
        if (task.id) {
            sortedTasksOut.push(...(subTasks.get(task.id) ?? []));
        }
    });
    return sortedTasksOut;
}

export function updateTaskType(
    countChange: ChangeTaskType,
    newPendingCount: number,
    newCompletedCount: number,
) {
    switch (countChange) {
        case 'AddPending':
            newPendingCount += 1;
            break;
        case 'DelPending':
            newPendingCount -= 1;
            break;
        case 'AddCompleted':
            newCompletedCount += 1;
            break;
        case 'DelCompleted':
            newCompletedCount -= 1;
            break;
        case 'PendingToCompleted':
            newPendingCount -= 1;
            newCompletedCount += 1;
            break;
        case 'CompletedToPending':
            newPendingCount += 1;
            newCompletedCount -= 1;
            break;
    }

    return [newPendingCount, newCompletedCount];
}
