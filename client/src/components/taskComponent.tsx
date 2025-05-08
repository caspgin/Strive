import { useState, useRef, useEffect } from 'react';
import '../css/task.css';
import { TaskType } from '../types/types';

export interface TaskProps {
    task: TaskType;
    onDelete?: (id: number) => void;
    onUpdate?: (task: TaskType) => void;
    newTask?: boolean;
    onNewTask?: (name: string) => void;
}

export const Task = ({
    task,
    onDelete,
    onUpdate,
    newTask,
    onNewTask,
}: TaskProps) => {
    const [isEditing, setIsEditing] = useState<boolean>(() => newTask || false);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [taskName, setTaskName] = useState<string>(() => task.name);
    const [hovered, setHovered] = useState<boolean>(false);
    const [complete, setComplete] = useState<boolean>(false);
    const taskRef = useRef<HTMLDivElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        handleInputHeight();

        if (!isEditing) {
            if (taskName && onUpdate) {
                if (taskName !== task.name) {
                    onUpdate({ id: task.id, name: taskName });
                }
            }
        } else {
            if (isFocused) {
                setIsFocused(false);
                handleSelectionOnFocus();
            }
        }
    }, [taskName, isEditing, task.id, task.name, onUpdate, isFocused]);

    function handleInputHeight() {
        if (textAreaRef.current) {
            textAreaRef.current.style.height =
                textAreaRef.current.scrollHeight + 'px';
        }
    }

    function handleSelectionOnFocus() {
        const textarea = textAreaRef.current;
        if (textarea) {
            textarea.select();
            textarea.setSelectionRange(0, textarea.value.length);
        }
    }

    function handleFocus() {
        if (taskRef.current) {
            taskRef.current.classList.add('task-active');
        }
        setIsFocused(true);
    }

    function handleBlur() {
        setIsEditing(false);
        setTaskName((prev: string) => {
            const trimmed = prev.trimEnd();
            if (newTask) {
                newTask = false;
                if (!trimmed && onDelete) {
                    onDelete(-1);
                } else if (trimmed && onNewTask) {
                    onNewTask(trimmed);
                }
            }
            return trimmed;
        });
        if (taskRef.current) {
            taskRef.current.classList.remove('task-active');
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setTaskName(event.target.value);
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (
            !taskName &&
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
                <div className="taskIcon">
                    <button
                        className="completionButton"
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                        onClick={() => setComplete((prev) => !prev)}
                    >
                        {complete ? (
                            <span className="material-symbols-outlined">
                                check
                            </span>
                        ) : (
                            <span className="material-symbols-outlined">
                                {hovered ? 'check' : 'radio_button_unchecked'}
                            </span>
                        )}
                    </button>
                </div>
                <div className="taskNameContainer">
                    {complete ? (
                        <div className="taskName complete">
                            <span>{taskName}</span>
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
                                    value={taskName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    onFocus={handleFocus}
                                    onKeyDown={handleKeyDown}
                                    rows={1}
                                    placeholder="Title"
                                    autoFocus
                                />
                            ) : (
                                <span>{taskName}</span>
                            )}
                        </div>
                    )}
                </div>
                <div className="deleteContainer">
                    <div className="delete">
                        <button
                            className="deleteButton"
                            onClick={() => onDelete?.(task.id)}
                        >
                            <span className="material-symbols-outlined">
                                delete
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
