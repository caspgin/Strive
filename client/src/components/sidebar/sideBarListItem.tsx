import { memo, useState } from 'react';

interface SideBarListItemProp {
	listid: number;
	listName: string;
	numOfTasks: number;
	listRender: boolean;
	handleListRender: (id: number) => void;
}

export const SideBarListItem = memo(
	({
		listid,
		listName,
		numOfTasks,
		handleListRender,
		listRender,
	}: SideBarListItemProp) => {
		const [showListName, setShowListName] = useState<boolean>(listRender);
		return (
			<li
				className="listItem"
				onClick={() => {
					setShowListName((prev) => !prev);
					handleListRender(listid);
				}}
			>
				<div className="inputBox">
					<input
						type="checkbox"
						checked={showListName}
						value={listName}
						name={listName}
					/>
					<div className="checkmarkContainer">
						<svg
							viewBox="0 0 24 24"
							width="currentWidth"
							height="currentHeight"
						>
							<path
								fill="none"
								strokeDashoffset="0"
								strokeDasharray="29.78"
								strokeWidth="4px"
								stroke="currentColor"
								d="M1.73,12.91 8.1,19.28 22.79,4.59"
							></path>
						</svg>
					</div>
				</div>
				<span className="listName roboto-semimedium">{listName}</span>
				<span className="taskNum roboto-medium">
					<span>{numOfTasks}</span>
				</span>
			</li>
		);
	},
);
