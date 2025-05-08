import { useEffect, useState } from 'react';
import './css/App.css';
import { Task } from './components/taskComponent.tsx';
import axios from 'axios';
import { TaskType } from './types/types.js';
import { AddTaskButton } from './components/addTaskComponent.tsx';

function App() {
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState<TaskType[]>(() => {
        return Array<TaskType>();
    });

    useEffect(() => {
        fetchTasks().then(() => {
            tasks.sort();
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

    const handleUpdate = async (task: TaskType) => {
        try {
            await axios.put(`/v1/tasks/${task.id}`, { name: task.name });
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`/v1/tasks/${id}`);
            setTasks((prev) => prev.filter((value) => value.id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    const handleEmptyTask = () => {
        const task: TaskType = {
            id: -1,
            name: '',
        };
        setTasks((prev) => Array<TaskType>(task, ...prev));
    };
    const handleNewTask = (name: string) => {
        axios
            .post('/v1/tasks/create', { name: name })
            .then((response) => {
                setTasks((prev) =>
                    prev.map((value) =>
                        value.id === -1
                            ? { ...value, ...response.data }
                            : value,
                    ),
                );
            })
            .catch((err) => {
                console.log(err);
                setTasks((prev) => prev.filter((value) => value.id !== -1));
            });
    };
    return (
        <div id="app">
            {loading ? (
                <Task task={{ name: 'loading', id: -1 }} />
            ) : (
                <div>
                    <AddTaskButton onEmptyTask={handleEmptyTask} />
                    {tasks.map((value: TaskType) => (
                        <Task
                            task={value}
                            onDelete={handleDelete}
                            onUpdate={handleUpdate}
                            key={value.id}
                            newTask={value.id === -1}
                            onNewTask={handleNewTask}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default App;
