import '../../css/taskDropDown.css';
import ReactDOM from 'react-dom';
import { TaskDropDownMenu } from './TaskDropDownMenu';
import { useDropDownMenu } from '../../Hooks/DropDownMenuHook';

const portalRoot = document.getElementById('portal');

export interface TaskDropDownMenuItemProp {
    handleOnDelete: () => void;
    handleOnEmptyTask: () => void;
    isSubTask: boolean;
}

type TaskDropDownProp = TaskDropDownMenuItemProp & {
    isEditing: boolean;
    isHovered: boolean;
};

export const TaskDropDown = ({
    isEditing,
    isHovered,
    isSubTask,
    handleOnDelete,
    handleOnEmptyTask,
}: TaskDropDownProp) => {
    const {
        openMenu,
        handleClose,
        setMenuPositionRef,
        isOpen,
        dropDownBtnRef,
        menuPos,
        onBlurRef,
        closeMenu,
    } = useDropDownMenu();
    return (
        <div className="taskDropDown" onBlur={handleClose}>
            {(isEditing || isHovered || isOpen) && (
                <div className="dropdown-button-container">
                    <button
                        onClick={openMenu}
                        ref={dropDownBtnRef}
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
                    <TaskDropDownMenu
                        {...{
                            menuPos,
                            onBlurRef,
                            setMenuPositionRef,
                            handleOnDelete,
                            handleOnEmptyTask,
                            isSubTask,
                            closeMenu,
                        }}
                    />,
                    portalRoot,
                )}
        </div>
    );
};
