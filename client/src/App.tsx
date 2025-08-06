import './css/App.css';
import { TaskType } from './types/types.js';
import { AddTaskButton } from './components/AddTaskComponent.tsx';
import { v4 as uuidv4 } from 'uuid';
import { Task } from './components/TaskComponent.tsx';
import { useTaskManagement } from './Hooks/TaskManagementHook.tsx';

function App() {
    const {
        tasks,
        loading,
        err,
        handleNewTask,
        handleEmptyTask,
        handleDelete,
        handleUpdate,
    } = useTaskManagement();
    console.log(err);
    return (
        <div id="app">
            <div>
                {loading ? (
                    <Task
                        givenTask={{
                            name: 'loading',
                            uuid: uuidv4(),
                            parentid: null,
                        }}
                    />
                ) : (
                    <div>
                        <AddTaskButton onEmptyTask={handleEmptyTask} />
                        {tasks.map((value: TaskType) => (
                            <Task
                                givenTask={value}
                                onDelete={handleDelete}
                                onUpdate={handleUpdate}
                                key={value.uuid}
                                newTask={value.id == undefined}
                                onNewTask={handleNewTask}
                                onEmptyTask={handleEmptyTask}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
