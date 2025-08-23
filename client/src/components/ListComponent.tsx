import { useMemo, useState } from 'react';
import { useTaskManagement } from '../Hooks/TaskManagementHook';
import { ListType, SortBy, TaskType } from '../types/types';
import { AddTaskButton } from './AddTaskComponent';
import { Task } from './TaskComponent';
import { cloneDeep } from 'lodash';
import '../css/list.css';
import { buildSortedTaskHeirachy } from '../utilities/TaskUtility';
interface ListComponentProp {
    list: ListType;
}

export const ListComponent = ({ list }: ListComponentProp) => {
    const [sortby] = useState<SortBy>(SortBy.UserOrder);
    const [mList] = useState<ListType>(() => cloneDeep(list) || null);
    const {
        tasks,
        loading,
        handleNewTask,
        handleEmptyTask,
        handleDelete,
        handleUpdate,
    } = useTaskManagement(list.id);

    const sortedTasks = useMemo(() => {
        return buildSortedTaskHeirachy(tasks, sortby);
    }, [tasks, sortby]);

    return (
        <div className="listComponent">
            {loading ? null : (
                <div>
                    <div className="listHeader">
                        <div className="title">
                            <div className="listTitle">{mList.name} </div>
                            <div className="listSetting">
                                <span className="material-symbols-outlined">
                                    more_vert
                                </span>
                            </div>
                        </div>
                        <AddTaskButton onEmptyTask={handleEmptyTask} />
                    </div>
                    <div className="listTasks">
                        {sortedTasks.map((value: TaskType) => (
                            <Task
                                givenTask={value}
                                onDelete={handleDelete}
                                onUpdate={handleUpdate}
                                key={value.uuid}
                                newTask={value.id == undefined}
                                onNewTask={handleNewTask}
                                onEmptyTask={handleEmptyTask}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
