import { useEffect, useState } from 'react';
import './css/App.css';
import { Task } from './components/taskComponent.tsx';
import axios from 'axios';
import { TaskType } from './types/types.js';

function App() {
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState<TaskType[]>(() => {
        return Array<TaskType>();
    });

    useEffect(() => {
        fetchTasks().then(() => {
            setTimeout(() => setLoading(false), 0);
        });
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('/v1/tasks/');
            setTasks(() => response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div id="app">
            {loading ? (
                <Task task={{ name: 'loading', id: 0 }} />
            ) : (
                tasks.map((value: TaskType) =>
                    value.name ? <Task task={value} key={value.id} /> : null,
                )
            )}
        </div>
    );
}

export default App;
