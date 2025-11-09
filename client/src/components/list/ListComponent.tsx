import { memo, useCallback, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import { useTaskManagement, useScroll } from '../../Hooks';
import { ChangeTaskType, ListType, SortBy, TaskType } from '../../types/types';
import {
	AddTaskButton,
	Task,
	ListDropDown,
	ListName,
	ListCompleted,
} from '../../components';
import { cloneDeep } from 'lodash';
import { buildSortedTaskHeirachy } from '../../utilities';
import '../../css/list.css';

interface ListComponentProp {
	list: ListType;
	deleteList: (id: number) => void;
	updateListName: (list: ListType) => void;
	updateTaskCount: (id: number, taskType: ChangeTaskType) => void;
}
const portalRoot = document.getElementById('portal');

export const ListComponent = memo(
	({
		list,
		deleteList,
		updateListName,
		updateTaskCount,
	}: ListComponentProp) => {
		//console.log(`List id: ${ list.id } rendered`);
		const { scrolled, handleScroll } = useScroll('Vertical');
		const [sortby, setSortBy] = useState<SortBy>(SortBy.UserOrder);
		const [mList, setMList] = useState<ListType>(
			() => cloneDeep(list) || null,
		);
		const [isNameDialogOpen, setIsNameDialogOpen] =
			useState<boolean>(false);
		const {
			tasks,
			loading,
			handleNewTask,
			handleEmptyTask,
			handleDelete,
			handleUpdate,
		} = useTaskManagement(list.id, updateTaskCount);

		const sortedTasks = useMemo(() => {
			return buildSortedTaskHeirachy(tasks, sortby);
		}, [tasks, sortby]);

		const completedTasks = useMemo(() => {
			return tasks.filter((task) => task.completed);
		}, [tasks]);

		const handleDeleteList = useCallback(() => {
			deleteList(list.id);
		}, [deleteList, list.id]);

		const handleRenameList = (newName: string) => {
			const updatedList: ListType = { ...mList, name: newName };
			updateListName(updatedList);
			setMList(updatedList);
		};

		return (
			<div className="listComponent" hidden={!list.render}>
				{loading ? null : (
					<div>
						<div
							className={`listHeader  ${scrolled > 0 && 'scrollingBorderList'} `}
						>
							<div className="listTitleMenu">
								<div className="listTitle roboto-semimedium">
									{mList.name}
								</div>
								<ListDropDown
									{...{
										sortby,
										setSortBy,
										listid: list.id,
										handleDeleteList,
										setIsNameDialogOpen,
									}}
								/>
							</div>
							<AddTaskButton onEmptyTask={handleEmptyTask} />
						</div>
						<div className="listTasks" onScroll={handleScroll}>
							{sortedTasks.map((value: TaskType) => {
								return (
									!value.completed && (
										<Task
											givenTask={value}
											onDelete={handleDelete}
											onUpdate={handleUpdate}
											key={value.uuid}
											newTask={value.id == undefined}
											onNewTask={handleNewTask}
											onEmptyTask={handleEmptyTask}
										/>
									)
								);
							})}
							{list.num_of_completed_tasks > 0 && (
								<ListCompleted
									{...{
										completedTasks,
										handleEmptyTask,
										handleNewTask,
										handleDelete,
										handleUpdate,
										completedTasksNum:
											list.num_of_completed_tasks,
									}}
								/>
							)}
						</div>
					</div>
				)}
				{isNameDialogOpen &&
					portalRoot &&
					ReactDOM.createPortal(
						<ListName
							{...{
								name: mList.name,
								setIsNameDialogOpen,
								handleName: handleRenameList,
							}}
						/>,
						portalRoot,
					)}
			</div>
		);
	},
);
