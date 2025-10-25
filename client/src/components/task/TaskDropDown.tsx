import { useRef, useState } from 'react';
import '../../css/taskDropDown.css';
import ReactDOM from 'react-dom';
import { Vector } from '../../types/types';
import { TaskDropDownMenu } from './TaskDropDownMenu';

const portalRoot = document.getElementById('portal');

interface TaskDropDownProp {
	isEditing: boolean;
	isHovered: boolean;
	handleOnDelete: () => void;
	handleOnEmptyTask: () => void;
	isSubTask: boolean;
}

export const TaskDropDown = ({
	isEditing,
	isHovered,
	handleOnDelete,
	handleOnEmptyTask,
	isSubTask,
}: TaskDropDownProp) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [position, setPosition] = useState<Vector>({ x: 0, y: 0 });
	const onBlurRef = useRef<HTMLDivElement>(null);
	const dropDownBtnRef = useRef<HTMLButtonElement>(null);

	const openDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		setIsOpen(true);
		const rect = dropDownBtnRef.current?.getBoundingClientRect();
		if (rect) {
			setPosition({ x: rect.right, y: rect.bottom });
		}
	};
	const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
		if (onBlurRef.current?.contains(event.relatedTarget)) {
			return;
		}
		setIsOpen(false);
	};

	return (
		<div className="taskDropDown" onBlur={handleBlur}>
			{(isEditing || isHovered || isOpen) && (
				<div className="dropdown-button-container">
					<button
						onClick={openDropdown}
						ref={dropDownBtnRef}
						className="dropdown-button"
					>
						<span className="material-symbols-outlined">
							more_vert
						</span>
					</button>
				</div>
			)}
			{isOpen &&
				portalRoot &&
				ReactDOM.createPortal(
					<TaskDropDownMenu
						{...{
							position,
							handleOnDelete,
							handleOnEmptyTask,
							isSubTask,
							onBlurRef,
						}}
					/>,
					portalRoot,
				)}
		</div>
	);
};
