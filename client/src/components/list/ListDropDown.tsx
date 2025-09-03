import { useState } from 'react';
import { DropDownItem } from '../../components';
import { SortBy } from '../../types/types';
import '../../css/listDropDown.css';

interface ListDropDownProp {
    sortby: SortBy;
    setSortBy: React.Dispatch<React.SetStateAction<SortBy>>;
    listid: number;
    handleDeleteList: () => void;
    handleRenameList: () => void;
}

export const ListDropDown = ({
    sortby,
    setSortBy,
    listid,
    handleDeleteList,
    handleRenameList,
}: ListDropDownProp) => {
    const [isOpen, setIsOpen] = useState(false);
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
        <div className="listDropDown" onBlur={handleBlur}>
            {
                <div className="dropdown-button-container listSetting">
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
                        <div className="sortByMenu">
                            <div className="dropdown-label">Sort by</div>
                            <div>
                                <DropDownItem
                                    {...{
                                        title: 'My order',
                                        icon_name:
                                            sortby == SortBy.UserOrder
                                                ? 'check'
                                                : '',
                                        handleClick: () => {
                                            setSortBy(SortBy.UserOrder);
                                        },
                                    }}
                                />
                                <DropDownItem
                                    {...{
                                        title: 'Date',
                                        icon_name:
                                            sortby == SortBy.Date
                                                ? 'check'
                                                : '',
                                        handleClick: () => {
                                            setSortBy(SortBy.Date);
                                        },
                                    }}
                                />
                                <DropDownItem
                                    {...{
                                        title: 'Title',
                                        icon_name:
                                            sortby == SortBy.Alphabetically
                                                ? 'check'
                                                : '',
                                        handleClick: () => {
                                            setSortBy(SortBy.Alphabetically);
                                        },
                                    }}
                                />
                            </div>
                        </div>
                        <hr className="line" />
                        <DropDownItem
                            {...{
                                title: 'Rename List',
                                handleClick: handleRenameList,
                            }}
                        />
                        <DropDownItem
                            {...{
                                title: 'Delete List',
                                handleClick: handleDeleteList,
                                disabled: listid == 0 ? true : false,
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
