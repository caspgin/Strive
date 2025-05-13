import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import '../css/task.css';
import { TaskType, UpdateResult } from '../types/types';
import { TaskIcon } from './taskIcon';
import { TaskDelete } from './taskDelete';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';

export interface TaskProps {
    givenTask: TaskType;
    onDelete?: (id: number) => void;
    onUpdate?: (task: TaskType) => Promise<UpdateResult>;
    newTask?: boolean;
    onNewTask?: (task: TaskType) => void;
}

export const Task = ({
    givenTask,
    onDelete,
    onUpdate,
    newTask,
    onNewTask,
}: TaskProps) => {
    const [isNewTask, setIsNewTask] = useState<boolean>(() => newTask || false);
    const [isEditing, setIsEditing] = useState<boolean>(() => newTask || false);
    const [isFocused, setIsFocused] = useState<boolean>(newTask || false);
    const [task, setTask] = useState<TaskType>(() =>
        cloneDeep(givenTask || {}),
    );
    const [ogTask, setOGTask] = useState<TaskType>(() =>
        cloneDeep(givenTask || {}),
    );
    const [hovered, setHovered] = useState<boolean>(false);
    const [complete, setComplete] = useState<boolean>(false);
    const taskRef = useRef<HTMLDivElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (isFocused) {
            handleFocus();
        }
        if (!isEditing) {
            updateTask();
        }
    }, [isFocused, isEditing]);

    useEffect(() => {
        if (isNewTask && !isEditing) {
            console.log(task, ogTask);
            setIsNewTask(false);
            if (isEqual(task, ogTask)) {
                onDelete?.(-1);
            } else {
                onNewTask?.(task);
            }
        }
    }, [task]);

    useLayoutEffect(() => {
        handleInputHeight();
    }, [task.name, isEditing]);

    function updateTask() {
        if (!isNewTask && !isEqual(task, ogTask)) {
            onUpdate?.(task).then((result: UpdateResult) => {
                if (result.success) {
                    setOGTask(cloneDeep(task));
                } else {
                    setTask(cloneDeep(ogTask));
                }
            });
        }
    }

    function handleInputHeight() {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = '0px';
            textAreaRef.current.style.height =
                textAreaRef.current.scrollHeight + 'px';
        }
    }

    function handleFocus() {
        //change background on focus
        if (taskRef.current) {
            taskRef.current.classList.add('task-active');
        }

        // Select the taskName on focus
        const textarea = textAreaRef.current;
        if (textarea) {
            textarea.select();
            textarea.setSelectionRange(0, textarea.value.length);
        }

        setIsFocused(false);
    }

    function handleBlur() {
        setIsEditing(false);

        setTask((prev: TaskType) => {
            const trimmed = prev.name.trim();
            const updateTask = { ...prev, name: trimmed };
            return updateTask;
        });

        if (taskRef.current) {
            taskRef.current.classList.remove('task-active');
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setTask((prev) => {
            const updateTask = {
                ...prev,
                name: event.target.value,
            };
            return updateTask;
        });
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (
            !task.name &&
            (event.key === 'Backspace' || event.key === 'Delete')
        ) {
            if (onDelete) {
                onDelete(task.id);
            }
        }
    }

    return (
        <div className="tasks" ref={taskRef}>
            <div className="taskContainer">
                <TaskIcon {...{ complete, hovered, setHovered, setComplete }} />
                <div className="taskNameContainer">
                    {complete ? (
                        <div className="taskName complete">
                            <span>{task.name}</span>
                        </div>
                    ) : (
                        <div
                            className="taskName"
                            onClick={() => setIsEditing(true)}
                        >
                            {isEditing ? (
                                <textarea
                                    spellCheck={false}
                                    ref={textAreaRef}
                                    value={task.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    onFocus={() => setIsFocused(true)}
                                    onKeyDown={handleKeyDown}
                                    rows={1}
                                    placeholder="Title"
                                    autoFocus
                                />
                            ) : (
                                <span>{task.name}</span>
                            )}
                        </div>
                    )}
                </div>
                <TaskDelete onDelete={onDelete} id={task.id} />
            </div>
        </div>
    );
};
