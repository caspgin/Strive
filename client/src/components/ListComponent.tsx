import { useMemo, useState } from 'react';
import { useTaskManagement } from '../Hooks/TaskManagementHook';
import { ListType, SortBy, TaskType } from '../types/types';
import { AddTaskButton } from './AddTaskComponent';
import { Task } from './TaskComponent';
import { cloneDeep } from 'lodash';
import { buildSortedTaskHeirachy } from '../utilities/TaskUtility';
import { ListDropDown } from './ListDropDown';
import '../css/list.css';

interface ListComponentProp {
    list: ListType;
    deleteList: (id: number) => void;
    setShowNameBox: React.Dispatch<React.SetStateAction<boolean>>;
    setListInfo: React.Dispatch<React.SetStateAction<ListType | null>>;
    setLists: React.Dispatch<React.SetStateAction<ListType[]>>;
}

export const ListComponent = ({
    list,
    deleteList,
    setShowNameBox,
    setListInfo,
    setLists,
}: ListComponentProp) => {
    console.log(`List id: ${list.id} rendered`);

    const [sortby, setSortBy] = useState<SortBy>(SortBy.UserOrder);
    const [mList] = useState<ListType>(() => cloneDeep(list) || null);
    const {
        tasks,
        loading,
        handleNewTask,
        handleEmptyTask,
        handleDelete,
        handleUpdate,
    } = useTaskManagement(list.id, setLists);

    const sortedTasks = useMemo(() => {
        return buildSortedTaskHeirachy(tasks, sortby);
    }, [tasks, sortby]);

    function handleDeleteList() {
        deleteList(list.id);
    }

    function handleRenameList() {
        setListInfo(mList);
        setShowNameBox(true);
    }

    return (
        <div className="listComponent" hidden={!list.render}>
            {loading ? null : (
                <div>
                    <div className="listHeader">
                        <div className="title">
                            <div className="listTitle">{mList.name} </div>
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
