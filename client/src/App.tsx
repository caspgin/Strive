import { ListComponent, ListName, SideBar } from './components';
import { ListType } from './types/types';
import { useListManagement } from './Hooks/ListManagementHook';
import { UIEvent, useState } from 'react';
import './css/App.css';
import { useScroll } from './Hooks/ScrollHook';

function App() {
    //console.log('app rendered');
    const {
        lists,
        deleteList,
        createNewList,
        updateList,
        updateTaskCount,
        err,
    } = useListManagement();

    const { scrolled, handleScroll } = useScroll('Horizontal');

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
            <section id="TopBar">
                <div className="header">
                    <div>
                        <span className="material-symbols-outlined">menu</span>
                    </div>
                    <div>
                        <div></div>
                        <h1>Strive</h1>
                    </div>
                </div>
            </section>
            <main id="MainSection">
                <section
                    className={`sideBarSection ${scrolled > 0 ? 'scrollingBorderColor' : ''}`}
                >
                    <SideBar
                        {...{
                            lists,
                            setShowNameBox,
                            setListInfo,
                            updateList,
                        }}
                    />
                </section>
                <section className="listAreaSection">
                    <div className="listAreaContainer" onScroll={handleScroll}>
                        {lists.map((list: ListType) => (
                            <ListComponent
                                key={list.id}
                                {...{
                                    list,
                                    deleteList,
                                    setShowNameBox,
                                    setListInfo,
                                    updateTaskCount,
                                }}
                            />
                        ))}
                    </div>
                </section>
            </main>
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
