import { DropDownMenuProp } from '../../types/types';
import { DropDownItem } from '../DropDown';
import { TaskDropDownMenuItemProp } from './TaskDropDown';

type TaskDropDownMenuProp = TaskDropDownMenuItemProp & DropDownMenuProp;

export const TaskDropDownMenu = ({
    menuPos,
    isSubTask,
    onBlurRef,
    handleOnEmptyTask,
    handleOnDelete,
    setMenuPositionRef,
}: TaskDropDownMenuProp) => {
    return (
        <div
            className="dropdown-menu-container"
            style={{
                top: menuPos.y,
                left: menuPos.x,
                right: 'auto',
                bottom: 'auto',
            }}
            ref={(node: HTMLDivElement | null) => {
                setMenuPositionRef(node);
                onBlurRef.current = node;
            }}
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
};
