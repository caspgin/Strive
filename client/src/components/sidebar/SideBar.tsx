import React, { useState } from 'react';
import { ListType } from '../../types/types';
import { SideBarListItem } from './sideBarListItem';
import '../../css/sideBar.css';

interface SideBarProp {
    lists: ListType[];
    setShowNameBox: React.Dispatch<React.SetStateAction<boolean>>;
    setListInfo: React.Dispatch<React.SetStateAction<ListType | null>>;
    setLists: React.Dispatch<React.SetStateAction<ListType[]>>;
}

export const SideBar = ({
    lists,
    setShowNameBox,
    setListInfo,
    setLists,
}: SideBarProp) => {
    console.log('sideBar rendered');
    const [showListData, setShowListData] = useState<boolean>(true);

    function handleCreateList() {
        setListInfo(null);
        setShowNameBox(true);
    }

    return (
        <div className="sideBarContainer">
            <div className="sideBar">
                <div className="listMetaDataContainer">
                    <div className="listMetaData">
                        <div className="lheaderContainer">
                            <div className="lheader">
                                <span>Lists</span>
                                <button
                                    className="showListDataBtn"
                                    onClick={() =>
                                        setShowListData(
                                            (prevValue) => !prevValue,
                                        )
                                    }
                                >
                                    {showListData ? (
                                        <span className=" material-symbols-outlined ">
                                            stat_1
                                        </span>
                                    ) : (
                                        <span className=" material-symbols-outlined ">
                                            stat_minus_1
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>
                        {showListData && (
                            <div className="listNamesContainer">
                                <div className="listNames">
                                    <ul>
                                        {lists.map((list) => (
                                            <SideBarListItem
                                                key={list.id}
                                                {...{
                                                    listid: list.id,
                                                    listName: list.name,
                                                    numOfTasks: list.numoftasks,
                                                    setLists,
                                                }}
                                            />
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                        <div className="createListBtnContainer">
                            <button
                                className="createListBtn"
                                onClick={handleCreateList}
                            >
                                <span className="material-symbols-outlined">
                                    Add
                                </span>
                                <div className="listName">
                                    <span>Create new list</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
