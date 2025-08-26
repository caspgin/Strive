import { useState } from 'react';
import '../css/taskDropDown.css';
import { DropDownItem } from './DropDownItem';

interface ListDropDownProp {}

export const ListDropDown = ({}: ListDropDownProp) => {
    const [isOpen, setIsOpen] = useState(() => false);
    const [sortType, setSortType] = useState(0);
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
    function handleClick() {
        console.log('click');
    }

    function handleRename() {}
    function handleDelete() {}
    return (
        <div className="taskDropDown" onBlur={handleBlur}>
            {
                <div className="listSetting">
                    <button onClick={openDropdown} className="dropdown-button">
                        <span className="material-symbols-outlined">
                            more_vert
                        </span>
                    </button>
                </div>
            }
            {isOpen && (
                <div className="dropdown-menu-container">
                    <div className="dropdown-menu">
                        <DropDownItem
                            {...{
                                title: 'My order',
                                icon_name: 'check',
                                handleClick,
                            }}
                        />
                        <DropDownItem
                            {...{
                                title: 'Date',
                                icon_name: 'check',
                                handleClick,
                            }}
                        />
                        <DropDownItem
                            {...{
                                title: 'Title',
                                icon_name: 'check',
                                handleClick,
                            }}
                        />
                        <DropDownItem
                            {...{
                                title: 'Rename List',
                                handleClick: handleRename,
                            }}
                        />
                        <DropDownItem
                            {...{
                                title: 'Delete List',
                                handleClick: handleDelete,
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
