import { memo, useState } from 'react';

interface SideBarListItemProp {
    listid: number;
    listName: string;
    numOfTasks: number;
    listRender: boolean;
    handleListRender: (id: number) => void;
}

export const SideBarListItem = memo(
    ({
        listid,
        listName,
        numOfTasks,
        handleListRender,
        listRender,
    }: SideBarListItemProp) => {
        const [showListName, setShowListName] = useState<boolean>(listRender);
        // console.log(`sideBarListItem rendered id: ${listid}`);
        return (
            <li
                className="listItem"
                onClick={() => {
                    setShowListName((prev) => !prev);
                    handleListRender(listid);
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
    },
);
