import { useCallback, useState } from 'react';
import { Vector } from '../../types/types';
import { DropDownItem } from '../DropDown';

interface TaskDropDownMenuProp {
	handleOnDelete?: () => void;
	handleOnEmptyTask?: () => void;
	isSubTask: boolean;
	position: Vector;
	onBlurRef: React.MutableRefObject<HTMLDivElement | null>;
}
export const TaskDropDownMenu = ({
	position,
	handleOnEmptyTask,
	handleOnDelete,
	isSubTask,
	onBlurRef,
}: TaskDropDownMenuProp) => {
	const [adjustPos, setAdjustPos] = useState<Vector>(position);
	const mRef = useCallback(
		(node: HTMLDivElement | null) => {
			if (node !== null) {
				const x = position.x - node.offsetWidth;
				const heightDiff =
					window.innerHeight - (position.y + node.offsetHeight);

				const y =
					position.y -
					(heightDiff < 0 ? Math.abs(heightDiff) + 20 : 0);
				if (x !== adjustPos.x || y !== adjustPos.y) {
					setAdjustPos({ x, y });
				}
			}
		},
		[adjustPos, position],
	);

	return (
		<div
			className="dropdown-menu-container"
			style={{
				top: adjustPos.y,
				left: adjustPos.x,
				right: 'auto',
				bottom: 'auto',
			}}
			ref={(node: HTMLDivElement | null) => {
				mRef(node);
				onBlurRef.current = node;
			}}
		>
			<div className="dropdown-menu">
				<DropDownItem
					{...{
						title: 'Add Subtask',
						icon_name: 'subdirectory_arrow_right',
						disabled: isSubTask,
						handleClick: (event) => {
							event.stopPropagation();
							handleOnEmptyTask?.();
						},
					}}
				/>
				<DropDownItem
					{...{
						title: 'Delete',
						icon_name: 'delete',
						handleClick: (event) => {
							event.stopPropagation();
							handleOnDelete?.();
						},
					}}
				/>
			</div>
		</div>
	);
};
