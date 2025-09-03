import { useCallback, useEffect, useState } from 'react';
import { ListType, TaskType } from '../types/types';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { normalizeTaskArray } from '../utilities';

export const useTaskManagement = (
    listid: number,
    setLists: React.Dispatch<React.SetStateAction<ListType[]>>,
) => {
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState<unknown>(null);

    //Fetch Data
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(
                    `/v2/lists/${Number(listid)}/tasks`,
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
    const handleUpdate = useCallback(async (task: TaskType) => {
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
            })
            .catch((error) => {
                setErr(error);
            });
    }, []);

    //Delete a Task
    const handleDelete = useCallback(
        async (uuid: string, id?: number) => {
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
                //Update numoftasks in list
                if (id) {
                    setLists((prevLists: ListType[]) =>
                        prevLists.map((list) =>
                            listid != list.id
                                ? list
                                : {
                                      ...list,
                                      numoftasks: Number(list.numoftasks) - 1,
                                  },
                        ),
                    );
                }
            } catch (error) {
                setErr(error);
            }
        },
        [listid, setLists],
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

                    setLists((prevLists) =>
                        prevLists.map((list) =>
                            listid != list.id
                                ? list
                                : {
                                      ...list,
                                      numoftasks: Number(list.numoftasks) + 1,
                                  },
                        ),
                    );
                })
                .catch((error) => {
                    setErr(error);
                });
        },
        [listid, setLists],
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
};
