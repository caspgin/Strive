import { useCallback, useEffect, useState } from 'react';
import { ChangeTaskType, ListType } from '../types/types';
import axios from 'axios';
import { updateTaskType } from '../utilities/TaskUtility';

export const useListManagement = () => {
    const [lists, setLists] = useState<ListType[]>([]);
    const [err, setErr] = useState<unknown>(null);

    useEffect(() => {
        const fetchLists = async () => {
            try {
                const response = await axios.get('/v2/lists/');
                if (!response || !response.data) {
                    setErr(new Error('Did not find any lists!'));
                    return;
                }
                const listData: ListType[] = response.data;
                listData.sort((a: ListType, b: ListType) => a.id - b.id);
                setLists(listData);
            } catch (error) {
                setErr(error);
            }
        };

        fetchLists();
    }, []);

    const createNewList = useCallback((name: string) => {
        axios
            .post('/v2/lists/', { name })
            .then((response) => {
                if (!response.data.id) {
                    setErr(new Error('List not created!'));
                    return;
                }
                const newList: ListType = { ...response.data, name: name };
                setLists((prevLists) => [...prevLists, newList]);
            })
            .catch((error) => {
                setErr(error);
            });
    }, []);

    const updateList = useCallback((updatedList: ListType) => {
        axios
            .put(`/v2/lists/${updatedList.id}`, { list: updatedList })
            .then(() => {
                setLists((prevLists) =>
                    prevLists.map((list) =>
                        list.id != updatedList.id ? list : updatedList,
                    ),
                );
            })
            .catch((error) => {
                setErr(error);
            });
    }, []);

    const deleteList = useCallback(async (id: number) => {
        try {
            const response = await axios.delete(`/v2/lists/${id}`);
            if (!response.data || response.data.deleteCount == 0) {
                setErr(new Error('List not deleted!'));
                return;
            }

            setLists((prevLists: ListType[]) =>
                prevLists.filter((list: ListType) => list.id != id),
            );
        } catch (error) {
            setErr(error);
        }
    }, []);

    const updateTaskCount = useCallback(
        async (id: number, countChange: ChangeTaskType) => {
            setLists((prevLists) =>
                prevLists.map((list) => {
                    if (list.id != id) {
                        return list;
                    }

                    const [newPendingCount, newCompletedCount] = updateTaskType(
                        countChange,
                        list.num_of_pending_tasks,
                        list.num_of_completed_tasks,
                    );

                    return {
                        ...list,
                        num_of_pending_tasks: newPendingCount,
                        num_of_completed_tasks: newCompletedCount,
                    };
                }),
            );
        },
        [],
    );

    return {
        lists,
        deleteList,
        createNewList,
        updateList,
        updateTaskCount,
        err,
    };
};
