import { ListComponent, ListName, SideBar } from './components';
import { ListType } from './types/types';
import { useListManagement } from './Hooks/ListManagementHook';
import { useState } from 'react';
import './css/App.css';

function App() {
    console.log('app rendered');
    const { lists, setLists, deleteList, createNewList, updateList, err } =
        useListManagement();
    const [showNameBox, setShowNameBox] = useState<boolean>(false);
    const [listInfo, setListInfo] = useState<ListType | null>(null);
    function updateListName(name: string) {
        if (listInfo && listInfo.id) {
            updateList({ ...listInfo, name: name });
        }

        if (listInfo === null) {
            createNewList(name);
        }
    }

    return (
        <div id="app">
            <section className="sideBarSection">
                <SideBar
                    {...{
                        lists,
                        setShowNameBox,
                        setListInfo,
                        setLists,
                    }}
                />
            </section>
            <section className="listAreaSection">
                <div className="listAreaContainer">
                    {lists.map((list: ListType) => (
                        <ListComponent
                            key={list.id}
                            {...{
                                list,
                                deleteList,
                                setShowNameBox,
                                setListInfo,
                                setLists,
                            }}
                        />
                    ))}
                </div>
            </section>
            {showNameBox && (
                <div className="dialogBoxContainer">
                    <ListName
                        name={listInfo ? listInfo.name : ''}
                        setShowNameBox={setShowNameBox}
                        updateListName={updateListName}
                    />
                </div>
            )}
        </div>
    );
}

export default App;
