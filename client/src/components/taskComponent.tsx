import { useState, useRef, useCallback } from 'react';
import '../css/task.css';
import { TaskType } from '../types/types';
import { TaskIcon } from './TaskIcon';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';
import { TaskName } from './TaskName';
import { TaskTime } from './TaskTime';
import { TaskDesc } from './TaskDesc';
import { TaskDropDown } from './TaskDropDown';

export interface TaskProps {
    givenTask: TaskType;
    onDelete: (uuid: string, id?: number) => void;
    onUpdate: (task: TaskType) => void;
    newTask: boolean;
    onNewTask: (task: TaskType) => void;
    onEmptyTask: (id?: number) => void;
}

export const Task = ({
    givenTask,
    onDelete,
    onUpdate,
    newTask,
    onNewTask,
    onEmptyTask,
}: TaskProps) => {
    //console.log(`task updated id:${givenTask.id}`);
    const [isNewTask, setIsNewTask] = useState<boolean>(() => newTask || false);
    const [isEditing, setIsEditing] = useState<boolean>(() => newTask || false);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [task, setTask] = useState<TaskType>(() =>
        cloneDeep(givenTask || {}),
    );
    const ogTaskRef = useRef<TaskType>(cloneDeep(givenTask || {}));
    const taskRef = useRef<HTMLDivElement>(null);
    const isSubTask: boolean = task.parentid != null;

    function updateTask() {
        if (isNewTask) {
            setIsNewTask(false);
            if (isEqual(task, ogTaskRef.current)) {
                onDelete(task.uuid);
            } else {
                onNewTask(task);
            }
        } else {
            if (!isEqual(task, ogTaskRef.current)) {
                onUpdate(task);
            }
        }
    }

    function handleFocus() {
        console.log('parentCalled');
        if (!isEditing) {
            setIsEditing(true);
        }
    }

    function handleBlur() {
        setIsEditing(false);
        setIsHovered(false);
        updateTask();
    }

    function handleOnDelete() {
        onDelete(task.uuid, task.id);
    }

    function handleOnEmptyTask() {
        onEmptyTask(task.id);
    }

    const handleCompletion = useCallback(() => {
        setTask((prevTask) => ({
            ...prevTask,
            completed: !prevTask.completed,
        }));
        onUpdate(task);
        console.log('done');
    }, [task, onUpdate]);

    return (
        <div
            className={`tasks ${isSubTask && 'subTask'} `}
            ref={taskRef}
            onClick={handleFocus}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="taskContainer">
                <TaskIcon
                    {...{
                        id: task.id,
                        completed: task.completed || false,
                        handleCompletion,
                    }}
                />
                <div className="taskData">
                    <TaskName
                        {...{
                            isEditing,
                            task,
                            setTask,
                        }}
                    />
                    {!isEditing && !task.description ? null : (
                        <TaskDesc {...{ isEditing, task, setTask }} />
                    )}
                    {!isEditing && !task.date ? null : (
                        <TaskTime {...{ task, isEditing, setTask }} />
                    )}

                    {isEditing ? (
                        <div className="editButtonContainer">
                            <button onClick={handleBlur} className="editButton">
                                Done
                            </button>
                        </div>
                    ) : null}
                </div>
                {!isNewTask && isHovered && (
                    <TaskDropDown
                        {...{
                            isEditing,
                            isHovered,
                            handleOnDelete,
                            handleOnEmptyTask,
                            isSubTask,
                        }}
                    />
                )}
            </div>
        </div>
    );
};
