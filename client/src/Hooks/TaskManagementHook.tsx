import { useCallback, useEffect, useState } from 'react';
import { ChangeTaskType, TaskType } from '../types/types';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { normalizeTaskArray } from '../utilities';

export function useTaskManagement(
    listid: number,
    updateTaskCount: (id: number, taskType: ChangeTaskType) => void,
) {
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState<unknown>(null);

    //Fetch Data
    useEffect(() => {
        const fetchTasks = async () => {
            const num_of_tasks = 10; // initial Number of completed tasks to get
            try {
                const response = await axios.get(
                    `/v2/lists/${Number(listid)}/tasks/${Number(num_of_tasks)}`,
                );
                const tasks: TaskType[] = normalizeTaskArray(response.data);
                setTasks(() => tasks);
            } catch (error) {
                setErr(error);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, [listid]);

    //Update a Task on Backend
    const handleUpdate = useCallback(
        async (task: TaskType, completionUpdate?: ChangeTaskType) => {
            const uuid = task.uuid;
            axios
                .put(`/v2/tasks/${Number(task.id)}`, {
                    task,
                })
                .then(() => {
                    setTasks((prevTasks) =>
                        prevTasks.map((value) =>
                            value.uuid === uuid ? task : value,
                        ),
                    );
                    if (completionUpdate) {
                        updateTaskCount(task.listid, completionUpdate);
                    }
                })
                .catch((error) => {
                    setErr(error);
                });
        },
        [updateTaskCount],
    );

    //Delete a Task
    const handleDelete = useCallback(
        async (uuid: string, status: boolean, id?: number) => {
            try {
                //If the task exists on DB, it has id
                if (id !== undefined) {
                    const response = await axios.delete(`/v2/tasks/${id}`);
                    if (!response || response.data?.deleteCount == 0) {
                        setErr(
                            new Error(
                                'Deletion on backend failed or there was nothing to delete.',
                            ),
                        );
                        return;
                    }
                    if (status) {
                        updateTaskCount(listid, 'DelCompleted');
                    } else {
                        updateTaskCount(listid, 'DelPending');
                    }
                }

                //Update the tasks state
                setTasks((prevTasks: TaskType[]) =>
                    prevTasks.filter((task: TaskType) => {
                        if (id && task.parentid == id) {
                            return false;
                        } else if (task.uuid === uuid) {
                            return false;
                        }
                        return true;
                    }),
                );
            } catch (error) {
                setErr(error);
            }
        },
        [listid, updateTaskCount],
    );

    const handleNewTask = useCallback(
        (task: TaskType) => {
            axios
                .post(`/v2/tasks/`, { task })
                .then((response) => {
                    setTasks((prevTasks) => {
                        const filteredTasks = prevTasks.filter(
                            (prevTask) => prevTask.uuid != task.uuid,
                        );
                        const newTask: TaskType = {
                            uuid: uuidv4(),
                            ...response.data,
                        };
                        return [...filteredTasks, newTask];
                    });
                    updateTaskCount(listid, 'AddPending');
                })
                .catch((error) => {
                    setErr(error);
                });
        },
        [listid, updateTaskCount],
    );

    const getMaxSortOrder = useCallback(
        (id?: number) => {
            const maxSortOrder: number = Math.max(
                ...(id
                    ? tasks
                          .filter((task) => task.parentid == id)
                          .map((task) => task.sort_order)
                    : tasks.map((task) => task.sort_order)),
            );

            return maxSortOrder < 0 ? 100 : maxSortOrder + 100;
        },
        [tasks],
    );

    const handleEmptyTask = useCallback(
        (id?: number) => {
            const task: TaskType = {
                uuid: uuidv4(),
                name: '',
                parentid: id ? id : null,
                listid: listid,
                sort_order: getMaxSortOrder(id),
                completed: false,
                completion_date: null,
            };
            setTasks((prevTasks) => [task, ...prevTasks]);
        },
        [listid, getMaxSortOrder],
    );

    return {
        tasks,
        loading,
        err,
        handleNewTask,
        handleEmptyTask,
        handleUpdate,
        handleDelete,
    };
}
