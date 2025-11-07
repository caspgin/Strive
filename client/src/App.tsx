import { ListComponent, ListName, SideBar, TopBar } from './components';
import { ListType } from './types/types';
import { useListManagement } from './Hooks/ListManagementHook';
import { useState } from 'react';
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
    const [showSideBar, setShowSideBar] = useState<boolean>(true);
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
            <TopBar {...{ setShowSideBar }} />
            <main id="MainSection">
                {showSideBar && (
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
                )}
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
