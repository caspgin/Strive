import { useState } from 'react';

export interface TaskIconProp {
	isComplete: boolean;
	setIsComplete: React.Dispatch<React.SetStateAction<boolean>>;
}

export function TaskIcon({ isComplete, setIsComplete }: TaskIconProp) {
	const [hovered, setHovered] = useState<boolean>(false);

	return (
		<div className="taskIcon">
			<button
				className="completionButton"
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				onClick={() => setIsComplete((prev) => !prev)}
			>
				{isComplete ? (
					<span className="material-symbols-outlined">check</span>
				) : (
					<span className="material-symbols-outlined">
						{hovered ? 'check' : 'radio_button_unchecked'}
					</span>
				)}
			</button>
		</div>
	);
}
