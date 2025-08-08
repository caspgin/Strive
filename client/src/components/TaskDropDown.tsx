import { useState } from 'react';
import '../css/taskDropDown.css';
import { TaskDelete } from './TaskDelete';

interface TaskDropDownProp {
    isEditing: boolean;
    isHovered: boolean;
    handleOnDelete: () => void;
    handleOnEmptyTask: () => void;
    isSubTask: boolean;
}

export const TaskDropDown = ({
    isEditing,
    isHovered,
    handleOnDelete,
    handleOnEmptyTask,
    isSubTask,
}: TaskDropDownProp) => {
    const [isOpen, setIsOpen] = useState(() => false);

    const openDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setIsOpen(true);
    };

    const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
        if (event.currentTarget.contains(event.relatedTarget)) {
            return;
        }
        setIsOpen(false);
    };

    return (
        <div className="taskDropDown" onBlur={handleBlur}>
            {(isEditing || isHovered || isOpen) && (
                <div className="dropdown-button-container">
                    <button onClick={openDropdown} className="dropdown-button">
                        <span className="material-symbols-outlined">
                            more_vert
                        </span>
                    </button>
                </div>
            )}
            {isOpen && (
                <div className="dropdown-menu-container">
                    <div className="dropdown-menu">
                        {!isSubTask && (
                            <button
                                onClick={(event) => {
                                    event.stopPropagation();
                                    handleOnEmptyTask();
                                }}
                                className="dropdown-item"
                            >
                                <span className="material-symbols-outlined">
                                    subdirectory_arrow_right
                                </span>
                                <span>Add Subtask</span>
                            </button>
                        )}
                        <TaskDelete {...{ handleOnDelete }} />
                    </div>
                </div>
            )}
        </div>
    );
};
