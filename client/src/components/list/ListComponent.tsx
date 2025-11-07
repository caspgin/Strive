import { memo, useCallback, useMemo, useState } from 'react';
import { useTaskManagement } from '../../Hooks/TaskManagementHook';
import { ChangeTaskType, ListType, SortBy, TaskType } from '../../types/types';
import { AddTaskButton, Task, ListDropDown } from '../../components';
import { cloneDeep } from 'lodash';
import { buildSortedTaskHeirachy } from '../../utilities';
import '../../css/list.css';
import { ListCompleted } from './ListCompleted';
import { useScroll } from '../../Hooks/ScrollHook';

interface ListComponentProp {
    list: ListType;
    deleteList: (id: number) => void;
    setShowNameBox: React.Dispatch<React.SetStateAction<boolean>>;
    setListInfo: React.Dispatch<React.SetStateAction<ListType | null>>;
    updateTaskCount: (id: number, taskType: ChangeTaskType) => void;
}

export const ListComponent = memo(
    ({
        list,
        deleteList,
        setShowNameBox,
        setListInfo,
        updateTaskCount,
    }: ListComponentProp) => {
        //console.log(`List id: ${ list.id } rendered`);
        const { scrolled, handleScroll } = useScroll('Vertical');
        const [sortby, setSortBy] = useState<SortBy>(SortBy.UserOrder);
        const [mList] = useState<ListType>(() => cloneDeep(list) || null);
        const {
            tasks,
            loading,
            handleNewTask,
            handleEmptyTask,
            handleDelete,
            handleUpdate,
        } = useTaskManagement(list.id, updateTaskCount);

        const sortedTasks = useMemo(() => {
            return buildSortedTaskHeirachy(tasks, sortby);
        }, [tasks, sortby]);

        const completedTasks = useMemo(() => {
            return tasks.filter((task) => task.completed);
        }, [tasks]);

        const handleDeleteList = useCallback(() => {
            deleteList(list.id);
        }, [deleteList, list.id]);

        const handleRenameList = useCallback(() => {
            setListInfo(mList);
            setShowNameBox(true);
        }, [mList, setShowNameBox, setListInfo]);

        return (
            <div className="listComponent" hidden={!list.render}>
                {loading ? null : (
                    <div>
                        <div
                            className={`listHeader  ${scrolled > 0 && 'scrollingBorderList'} `}
                        >
                            <div className="listTitleMenu">
                                <div className="listTitle roboto-semimedium">
                                    {mList.name}
                                </div>
                                <ListDropDown
                                    {...{
                                        sortby,
                                        setSortBy,
                                        listid: list.id,
                                        handleDeleteList,
                                        handleRenameList,
                                    }}
                                />
                            </div>
                            <AddTaskButton onEmptyTask={handleEmptyTask} />
                        </div>
                        <div className="listTasks" onScroll={handleScroll}>
                            {sortedTasks.map((value: TaskType) => {
                                return (
                                    !value.completed && (
                                        <Task
                                            givenTask={value}
                                            onDelete={handleDelete}
                                            onUpdate={handleUpdate}
                                            key={value.uuid}
                                            newTask={value.id == undefined}
                                            onNewTask={handleNewTask}
                                            onEmptyTask={handleEmptyTask}
                                        />
                                    )
                                );
                            })}
                            {list.num_of_completed_tasks > 0 && (
                                <ListCompleted
                                    {...{
                                        completedTasks,
                                        handleEmptyTask,
                                        handleNewTask,
                                        handleDelete,
                                        handleUpdate,
                                        completedTasksNum:
                                            list.num_of_completed_tasks,
                                    }}
                                />
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    },
);
