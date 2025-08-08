import { useEffect, useState } from 'react';
import { ListComponent } from './components/ListComponent';
import './css/App.css';
import axios from 'axios';
import { ListType } from './types/types';

function App() {
    const [lists, setLists] = useState<ListType[]>([]);
    const [appError, setAppError] = useState<unknown>(null);
    useEffect(() => {
        const fetchLists = async () => {
            try {
                const response = await axios.get('/v2/lists/');
                if (!response || !response.data) {
                    setAppError(new Error('List could not be loaded!'));
                    return;
                }
                const listsData: ListType[] = response.data;
                listsData.sort((a: ListType, b: ListType) => a.id - b.id);
                setLists(response.data);
            } catch (error) {
                setAppError(error);
            }
        };

        fetchLists();
    }, []);

    return (
        <div id="app">
            {lists.map((list: ListType) => (
                <ListComponent key={list.id} list={list} />
            ))}
        </div>
    );
}

export default App;
