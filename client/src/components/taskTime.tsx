import { useEffect, useRef, useState } from 'react';
import { TaskType, Time } from '../types/types';
import './../css/taskTime.css';
import { DateNTimePicker } from './DateNTimePicker';
import { DateTimeDisplay } from './DateTimeDisplay';

export interface TaskTimeProp {
    task: TaskType;
    isEditing: boolean;
    setTask: React.Dispatch<React.SetStateAction<TaskType>>;
}

export const TaskTime = ({ task, isEditing, setTask }: TaskTimeProp) => {
    const [date, setDate] = useState<Date | null>(() => task.date || null);
    const [time, setTime] = useState<Time | null>(() => task.time || null);
    const [showPicker, setShowPicker] = useState<boolean>(false);
    const closeRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        setDate(task.date || null);
        setTime(task.time || null);
    }, [task.date, task.time]);

    function handlePicker() {
        setShowPicker(true);
    }

    function handleClose() {
        setTask((prev) => ({ ...prev, date: null, time: null }));
    }

    function handleEdit(event: React.MouseEvent<HTMLButtonElement>) {
        const targetNode = event.target as Node;
        const closeButtonRef = closeRef.current;
        if (closeButtonRef && closeButtonRef.contains(targetNode)) {
            handleClose();
        } else {
            setShowPicker(true);
        }
    }

    return (
        <div className="taskTimeContainer">
            {!isEditing ? (
                date ? (
                    <div className="displayTimeContainer">
                        <DateTimeDisplay date={date} time={time} />
                    </div>
                ) : null
            ) : date ? (
                <button className="taskTimeEdit" onClick={handleEdit}>
                    <DateTimeDisplay date={date} time={time} />
                    <div ref={closeRef}>
                        <span className="material-symbols-outlined">close</span>
                    </div>
                </button>
            ) : (
                <button onClick={handlePicker}>
                    <span className="material-symbols-outlined">event</span>
                </button>
            )}
            {showPicker && (
                <DateNTimePicker
                    {...{
                        date,
                        setShowPicker,
                        time,
                        setTask,
                    }}
                />
            )}
        </div>
    );
};
