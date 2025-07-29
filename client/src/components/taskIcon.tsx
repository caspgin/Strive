import { useState } from 'react';
import { TaskType } from '../types/types';

export interface TaskIconProp {
    task: TaskType;
    setTask: React.Dispatch<React.SetStateAction<TaskType>>;
}

export function TaskIcon({ task, setTask }: TaskIconProp) {
    const [hovered, setHovered] = useState<boolean>(false);

    return (
        <div className="taskIcon">
            <button
                className="completionButton"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() =>
                    setTask((prev) => ({ ...prev, completed: !prev.completed }))
                }
            >
                {task.completed ? (
                    <span className="material-symbols-outlined">check</span>
                ) : (
                    <span className="material-symbols-outlined">
                        {hovered ? 'check' : 'radio_button_unchecked'}
                    </span>
                )}
            </button>
        </div>
    );
}
