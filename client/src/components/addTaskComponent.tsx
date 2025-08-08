import './../css/addTaskButton.css';

export interface AddTaskButtonProp {
    onEmptyTask: (id?: number) => void;
}

export const AddTaskButton = ({ onEmptyTask }: AddTaskButtonProp) => {
    return (
        <div className="createContainer">
            <button onClick={() => onEmptyTask()}>
                <div className="logo-container">
                    <span className="material-symbols-outlined">add_task</span>
                </div>
                <div className="label">
                    <p>Add a task</p>
                </div>
            </button>
        </div>
    );
};
