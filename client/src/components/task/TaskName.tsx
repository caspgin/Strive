import { memo, useRef, useState } from 'react';
import { TaskType } from '../../types/types';
import '../../css/taskName.css';

export interface TaskNameProp {
    isEditing: boolean;
    taskCompleted: boolean;
    taskName: string;
    setTask: React.Dispatch<React.SetStateAction<TaskType>>;
}

export const TaskName = memo(
    ({ taskName, taskCompleted, isEditing, setTask }: TaskNameProp) => {
        console.log(`TaskName of task : ${taskName} is rendered`);
        const textAreaRef = useRef<HTMLTextAreaElement>(null);
        const [name, setName] = useState<string>(() => taskName || '');

        function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
            setName(event.target.value);
            handleInputHeight();
        }
        function handleInputHeight(target?: HTMLTextAreaElement) {
            const textArea = textAreaRef.current || target;

            if (textArea) {
                textArea.style.height = '0px';
                textArea.style.height = textArea.scrollHeight + 'px';
            }
        }
        function handleBlur() {
            const updatedName = name.trim();
            if (updatedName !== taskName) {
                setTask((prev) => {
                    const updatedTask = { ...prev, name: updatedName };
                    return updatedTask;
                });
            }
        }
        function handleFocus(event: React.FocusEvent<HTMLTextAreaElement>) {
            const textArea = event.target;
            handleInputHeight(event.target);
            if (textArea) {
                textArea.select();
                textArea.setSelectionRange(0, textArea.value.length);
            }
        }
        return (
            <div className="taskNameContainer">
                {taskCompleted ? (
                    <div className="taskName complete">
                        <span>{name}</span>
                    </div>
                ) : (
                    <div className="taskName">
                        {isEditing ? (
                            <textarea
                                ref={textAreaRef}
                                spellCheck={false}
                                value={name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onFocus={handleFocus}
                                rows={1}
                                placeholder="Title"
                                autoFocus
                            />
                        ) : (
                            <span>{name}</span>
                        )}
                    </div>
                )}
            </div>
        );
    },
);
