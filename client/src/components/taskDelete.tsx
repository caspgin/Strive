export interface TaskDeleteProp {
    onDelete?: (id: number) => void;
    id: number;
}

export function TaskDelete({ onDelete, id }: TaskDeleteProp) {
    return (
        <div className="deleteContainer">
            <div className="delete">
                <button className="deleteButton" onClick={() => onDelete?.(id)}>
                    <span className="material-symbols-outlined">delete</span>
                </button>
            </div>
        </div>
    );
}
