import { useState } from 'react';
import { ChangeTaskType, TaskType } from '../../types/types';
import { Task } from '../task';
import '../../css/listCompleted.css';

export interface ListCompletedProp {
    completedTasks: TaskType[];
    completedTasksNum: number;
    handleUpdate: (task: TaskType, completionUpdate?: ChangeTaskType) => void;
    handleDelete: (uuid: string, status: boolean, id?: number) => void;
    handleNewTask: (task: TaskType) => void;
    handleEmptyTask: (id?: number) => void;
}

export const ListCompleted = ({
    completedTasks,
    completedTasksNum,
    handleDelete,
    handleUpdate,
    handleNewTask,
    handleEmptyTask,
}: ListCompletedProp) => {
    const [showList, setShowList] = useState(false);
    return (
        <div className="listCompletedSection">
            <div className="listCompletedHeaderContainer">
                <button
                    className="listCompletedHeader"
                    onClick={() => {
                        setShowList((previousVal) => !previousVal);
                    }}
                >
                    <div className="listCompletedHeaderIconContainer">
                        <div className="listCompletedHeaderIcon">
                            {showList === false ? (
                                <span className="material-symbols-outlined">
                                    arrow_right
                                </span>
                            ) : (
                                <span className="material-symbols-outlined">
                                    arrow_drop_down
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="listCompletedHeaderLabel">
                        <span>Completed</span>
                        <span>({completedTasksNum})</span>
                    </div>
                </button>
            </div>

            {showList &&
                completedTasks.map((value: TaskType) => {
                    return (
                        <Task
                            givenTask={value}
                            onDelete={handleDelete}
                            onUpdate={handleUpdate}
                            key={value.uuid}
                            newTask={value.id == undefined}
                            onNewTask={handleNewTask}
                            onEmptyTask={handleEmptyTask}
                        />
                    );
                })}
        </div>
    );
};
