export interface TaskDeleteProp {
	onDelete?: (uuid: string, id?: number) => void;
	uuid: string;
	id?: number;
}

export function TaskDelete({ onDelete, uuid, id }: TaskDeleteProp) {
	return (
		<div className="deleteContainer">
			<div className="delete">
				<button
					className="deleteButton"
					onClick={() => onDelete?.(uuid, id)}
				>
					<span className="material-symbols-outlined">delete</span>
				</button>
			</div>
		</div>
	);
}
