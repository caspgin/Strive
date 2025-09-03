import { memo, useRef, useState } from 'react';
import { TaskType } from '../../types/types';
import '../../css/taskDesc.css';

interface TaskDescProp {
    isEditing: boolean;
    taskDesc: string;
    setTask: React.Dispatch<React.SetStateAction<TaskType>>;
}

export const TaskDesc = memo(
    ({ isEditing, taskDesc, setTask }: TaskDescProp) => {
        console.log(`taskDesc updated`);
        const [desc, setDesc] = useState<string>(() => taskDesc || '');
        const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

        function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
            setDesc(event.target.value);
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
            const updatedDesc = desc.trim();
            if (updatedDesc !== taskDesc) {
                setTask((prev) => {
                    const updatedTask = { ...prev, description: updatedDesc };
                    return updatedTask;
                });
            }
        }
        function handleFocus(event: React.FocusEvent<HTMLTextAreaElement>) {
            const textArea = event.target;
            handleInputHeight(event.target);
            if (textArea) {
                textArea.setSelectionRange(
                    textArea.value.length,
                    textArea.value.length,
                );
            }
        }
        return (
            <div className="descContainer">
                <div className="desc">
                    {isEditing ? (
                        <textarea
                            ref={textAreaRef}
                            spellCheck={false}
                            value={desc}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onFocus={handleFocus}
                            rows={1}
                            placeholder="Desc"
                        />
                    ) : (
                        <span>{desc}</span>
                    )}
                </div>
            </div>
        );
    },
);
