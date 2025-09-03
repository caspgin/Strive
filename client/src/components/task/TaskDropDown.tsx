import { useState } from 'react';
import '../../css/taskDropDown.css';
import { DropDownItem } from '../../components';

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
                        <DropDownItem
                            {...{
                                title: 'Add Subtask',
                                icon_name: 'subdirectory_arrow_right',
                                disabled: isSubTask,
                                handleClick: (event) => {
                                    event.stopPropagation();
                                    handleOnEmptyTask();
                                },
                            }}
                        />
                        <DropDownItem
                            {...{
                                title: 'Delete',
                                icon_name: 'delete',
                                handleClick: (event) => {
                                    event.stopPropagation();
                                    handleOnDelete();
                                },
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
