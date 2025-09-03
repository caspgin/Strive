import { useState } from 'react';
import { ListType } from '../../types/types';

interface SideBarListItemProp {
    listid: number;
    listName: string;
    numOfTasks: number;
    setLists: React.Dispatch<React.SetStateAction<ListType[]>>;
}

export const SideBarListItem = ({
    listid,
    listName,
    numOfTasks,
    setLists,
}: SideBarListItemProp) => {
    const [showListName, setShowListName] = useState<boolean>(true);

    return (
        <li
            className="listItem"
            onClick={() => {
                setShowListName((prev) => !prev);
                setLists((prevLists: ListType[]) =>
                    prevLists.map((list: ListType) =>
                        list.id != listid
                            ? list
                            : { ...list, render: !list.render },
                    ),
                );
            }}
        >
            <span className="inputBox">
                <input
                    type="checkbox"
                    checked={showListName}
                    value={listName}
                    name={listName}
                />
            </span>
            <span className="listName">{listName}</span>
            <span className="slistTasks">
                <span>{numOfTasks}</span>
            </span>
        </li>
    );
};
