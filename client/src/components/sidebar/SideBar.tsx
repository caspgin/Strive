import { useCallback, useState } from 'react';
import { ListType } from '../../types/types';
import { SideBarListItem } from './sideBarListItem';
import ReactDOM from 'react-dom';
import '../../css/sideBar.css';
import { ListName } from '../list';

interface SideBarProp {
	lists: ListType[];
	updateList: (list: ListType) => void;
	createList: (name: string) => void;
}
const portalRoot = document.getElementById('portal');

export const SideBar = ({ lists, createList, updateList }: SideBarProp) => {
	//console.log('sideBar rendered');
	const [showListData, setShowListData] = useState<boolean>(true);
	const [isNameDialogOpen, setIsNameDialogOpen] = useState<boolean>(false);

	function handleCreateList(name: string) {
		createList(name);
	}

	const handleListRender = useCallback(
		(id: number) => {
			const foundList: ListType | undefined = lists.find(
				(list) => list.id == id,
			);
			if (foundList) {
				updateList({ ...foundList, render: !foundList.render });
			}
		},
		[lists, updateList],
	);

	return (
		<div className="sideBar">
			<div className="listMetaData">
				<div className="listheader roboto-medium">
					<span>Lists</span>
					<div className="listBtnContainer">
						<button
							className="listBtn"
							onClick={() =>
								setShowListData((prevValue) => !prevValue)
							}
						>
							<div className="listBtnIcon">
								{showListData ? (
									<span className=" material-symbols-outlined ">
										stat_1
									</span>
								) : (
									<span className=" material-symbols-outlined ">
										stat_minus_1
									</span>
								)}
							</div>
						</button>
					</div>
				</div>

				<div className="listNamesContainer" hidden={!showListData}>
					<div className="listNames">
						<ul>
							{lists.map((list) => (
								<SideBarListItem
									key={list.id}
									{...{
										listid: list.id,
										listName: list.name,
										listRender: list.render,
										numOfTasks: list.num_of_pending_tasks,
										handleListRender,
									}}
								/>
							))}
						</ul>
					</div>
				</div>

				<div className="createListBtnContainer">
					<button
						className="createListBtn "
						onClick={() => {
							setIsNameDialogOpen(true);
						}}
					>
						<span className="material-symbols-outlined">Add</span>
						<div className="listName roboto-semimedium">
							<span>Create new list</span>
						</div>
					</button>
				</div>
			</div>

			{isNameDialogOpen &&
				portalRoot &&
				ReactDOM.createPortal(
					<ListName
						{...{
							name: '',
							setIsNameDialogOpen,
							handleName: handleCreateList,
						}}
					/>,
					portalRoot,
				)}
		</div>
	);
};
