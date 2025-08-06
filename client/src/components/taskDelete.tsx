export interface TaskDeleteProp {
    handleOnDelete: () => void;
}

export function TaskDelete({ handleOnDelete }: TaskDeleteProp) {
    return (
        <button
            className="dropdown-item"
            onClick={(event) => {
                event.stopPropagation();
                handleOnDelete();
            }}
        >
            <span className="material-symbols-outlined">delete</span>
            <span>Delete</span>
        </button>
    );
}
