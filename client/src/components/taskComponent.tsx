import { useState, useRef, useEffect, useCallback } from 'react';
import '../css/task.css';
import { TaskType } from '../types/types';
import axios from 'axios';

export const Task = ({ task: { name, id } }: { task: TaskType }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [taskName, setTaskName] = useState<string>(name);
    const taskRef = useRef<HTMLDivElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const updateTasks = useCallback(async () => {
        try {
            const updateObj: TaskType = {
                id: id,
                name: taskName,
            };
            await axios.put(`/v1/tasks/${id}`, updateObj);
        } catch (err) {
            console.log(err);
        }
    }, [id, taskName]);

    const deleteTasks = useCallback(async () => {
        try {
            await axios.delete(`/v1/tasks/${id}`);
        } catch (err) {
            console.log(err);
        }
    }, [id]);

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height =
                textAreaRef.current.scrollHeight + 'px';
        }

        if (!isEditing) {
            if (taskName) {
                updateTasks().then(() => console.log('updated'));
            } else {
                deleteTasks();
            }
        }
    }, [taskName, isEditing, updateTasks, deleteTasks]);

    function handleFocus() {
        if (taskRef.current) {
            taskRef.current.classList.add('task-active');
        }
    }
    function handleBlur() {
        setIsEditing(false);
        setTaskName((prev: string) => {
            const trimmedTask = prev.trimEnd();
            return trimmedTask;
        });
        if (taskRef.current) {
            taskRef.current.classList.remove('task-active');
        }
    }
    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setTaskName(event.target.value);
    }

    return (
        <div className="tasks" ref={taskRef}>
            <div className="taskContainer">
                <div className="taskIcon">
                    <button>
                        <span className="material-symbols-outlined">
                            radio_button_unchecked
                        </span>
                    </button>
                </div>
                <div className="taskNameContainer">
                    <div
                        className="taskName"
                        onClick={() => setIsEditing(true)}
                    >
                        {isEditing ? (
                            <textarea
                                ref={textAreaRef}
                                value={taskName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onFocus={handleFocus}
                                rows={1}
                                autoFocus
                            />
                        ) : (
                            <span>{taskName}</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
