import { forwardRef, useRef, useState } from 'react';
import '../../css/taskDropDown.css';
import { DropDownItem } from '../../components';
import ReactDOM from 'react-dom';
import { Position } from '../../types/types';

interface TaskDropDownProp {
    isEditing: boolean;
    isHovered: boolean;
    handleOnDelete: () => void;
    handleOnEmptyTask: () => void;
    isSubTask: boolean;
}
interface DropDownMenuProp {
    handleOnDelete?: () => void;
    handleOnEmptyTask?: () => void;
    isSubTask: boolean;
    position: Position;
}
const portalRoot = document.getElementById('portal');
const DropDownMenu = forwardRef(
    (
        {
            position,
            handleOnEmptyTask,
            handleOnDelete,
            isSubTask,
        }: DropDownMenuProp,
        dropDownMenuRef: React.Ref<HTMLDivElement>,
    ) => {
        const dummy = document
            .getElementById('dropDownMenuDummy')
            ?.getBoundingClientRect();
        const heightDiff =
            window.innerHeight -
            (position.top + (dummy ? dummy.height + 10 : 0));
        return (
            <div
                className="dropdown-menu-container"
                style={{
                    top:
                        heightDiff <= 0
                            ? position.top - Math.abs(heightDiff)
                            : position.top,
                    left: position.left - (dummy ? dummy.width : 0),
                    right: 'auto',
                    bottom: 'auto',
                }}
                ref={dropDownMenuRef}
            >
                <div className="dropdown-menu">
                    <DropDownItem
                        {...{
                            title: 'Add Subtask',
                            icon_name: 'subdirectory_arrow_right',
                            disabled: isSubTask,
                            handleClick: (event) => {
                                event.stopPropagation();
                                handleOnEmptyTask?.();
                            },
                        }}
                    />
                    <DropDownItem
                        {...{
                            title: 'Delete',
                            icon_name: 'delete',
                            handleClick: (event) => {
                                event.stopPropagation();
                                handleOnDelete?.();
                            },
                        }}
                    />
                </div>
            </div>
        );
    },
);

export const TaskDropDown = ({
    isEditing,
    isHovered,
    handleOnDelete,
    handleOnEmptyTask,
    isSubTask,
}: TaskDropDownProp) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [position, setPosition] = useState<Position>({ top: 0, left: 0 });
    const dropDownBtnRef = useRef<HTMLButtonElement>(null);
    const dropDownMenuRef = useRef<HTMLDivElement>(null);
    const openDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setIsOpen(true);
        const rect = dropDownBtnRef.current?.getBoundingClientRect();
        setPosition({
            top: rect ? rect.top : -1,
            left: rect ? rect.left : -1,
        });
    };

    const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
        if (dropDownMenuRef.current?.contains(event.relatedTarget)) {
            return;
        }
        setIsOpen(false);
    };

    return (
        <div className="taskDropDown" onBlur={handleBlur}>
            {(isEditing || isHovered || isOpen) && (
                <div className="dropdown-button-container">
                    <button
                        ref={dropDownBtnRef}
                        onClick={openDropdown}
                        className="dropdown-button"
                    >
                        <span className="material-symbols-outlined">
                            more_vert
                        </span>
                    </button>
                </div>
            )}
            {isOpen &&
                portalRoot &&
                ReactDOM.createPortal(
                    <DropDownMenu
                        {...{
                            position,
                            handleOnDelete,
                            handleOnEmptyTask,
                            isSubTask,
                        }}
                        ref={dropDownMenuRef}
                    />,
                    portalRoot,
                )}
        </div>
    );
};
