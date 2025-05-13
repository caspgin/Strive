import { useEffect, useState } from 'react';
import './css/App.css';
import { Task } from './components/taskComponent.tsx';
import axios from 'axios';
import { TaskType } from './types/types.js';
import { AddTaskButton } from './components/addTaskComponent.tsx';
import { Dropdown } from './components/VersionSettingDropDown.tsx';

function App() {
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState<TaskType[]>(() => {
        return Array<TaskType>();
    });
    const [version, setVersion] = useState<string>('v1');

    useEffect(() => {
        fetchTasks().then(() => {
            tasks.sort();
            console.log(tasks);
            setTimeout(() => setLoading(false), 0);
        });
    }, [version]);

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`/${version}/tasks/`);
            setTasks(() => response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdate = async (task: TaskType) => {
        try {
            const { id, ...restTask } = task;
            await axios.put(`/${version}/tasks/${id}`, { task: restTask });
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`/${version}/tasks/${id}`);
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
    const handleNewTask = (task: TaskType) => {
        const { id, ...restTask } = task;
        axios
            .post(`/${version}/tasks/create`, { task: restTask })
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
            <div>
                <Dropdown version={version} setVersion={setVersion} />
            </div>
            <div>
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
        </div>
    );
}

export default App;
