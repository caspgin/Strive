import { useCallback, useEffect, useState } from 'react';
import { TaskType } from '../types/types';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import {
    buildSortedTaskHeirachy,
    normalizeTaskArray,
} from '../utilities/TaskUtility';

export const useTaskManagement = () => {
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState<unknown>(null);

    //Fetch Data
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`/v2/tasks/`);
                const data: TaskType[] = normalizeTaskArray(response.data);
                const sortedTasks: TaskType[] = buildSortedTaskHeirachy(data);
                setTasks(() => sortedTasks);
            } catch (error) {
                setErr(error);
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, []);

    //Update a Task on Backend
    const handleUpdate = useCallback(async (task: TaskType) => {
        const uuid = task.uuid;
        axios
            .put(`/v2/tasks/${Number(task.id)}`, {
                task,
            })
            .then(() => {
                setTasks((prev) =>
                    prev.map((value) => (value.uuid === uuid ? task : value)),
                );
            })
            .catch((error) => {
                setErr(error);
            });
    }, []);

    //Delete a Task
    const handleDelete = useCallback(async (uuid: string, id?: number) => {
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
                prevTasks.filter(
                    (prevTask: TaskType) =>
                        prevTask.uuid !== uuid &&
                        id &&
                        prevTask.parentid !== id,
                ),
            );
        } catch (error) {
            setErr(error);
        }
    }, []);

    const handleNewTask = useCallback((task: TaskType) => {
        axios
            .post(`/v2/tasks/create`, { task })
            .then((response) => {
                setTasks((prevTasks) => {
                    const newTasks = prevTasks.filter(
                        (prevTask) => prevTask.uuid != task.uuid,
                    );
                    const newTask: TaskType = {
                        uuid: uuidv4(),
                        ...response.data,
                    };
                    newTasks.push(newTask);
                    return buildSortedTaskHeirachy(newTasks);
                });
            })
            .catch((error) => {
                setErr(error);
            });
    }, []);

    const handleEmptyTask = useCallback((id?: number) => {
        const task: TaskType = {
            uuid: uuidv4(),
            name: '',
            parentid: id ? id : null,
        };
        setTasks((prevTasks) => buildSortedTaskHeirachy([task, ...prevTasks]));
    }, []);

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
