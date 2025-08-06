import './../css/addTaskButton.css';

export interface AddTaskButtonProp {
    onEmptyTask: (id?: number) => void;
}

export const AddTaskButton = ({ onEmptyTask }: AddTaskButtonProp) => {
    return (
        <div className="createContainer">
            <button onClick={() => onEmptyTask()}>
                <div>
                    <span className="material-symbols-outlined">add_task</span>
                </div>
                <div>Add a task</div>
            </button>
        </div>
    );
};
