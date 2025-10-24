import { memo, useCallback, useMemo, useState } from 'react';
import { useTaskManagement } from '../../Hooks/TaskManagementHook';
import { ListType, SortBy, TaskType } from '../../types/types';
import { AddTaskButton, Task, ListDropDown } from '../../components';
import { cloneDeep } from 'lodash';
import { buildSortedTaskHeirachy } from '../../utilities';
import '../../css/list.css';

interface ListComponentProp {
	list: ListType;
	deleteList: (id: number) => void;
	setShowNameBox: React.Dispatch<React.SetStateAction<boolean>>;
	setListInfo: React.Dispatch<React.SetStateAction<ListType | null>>;
	updateTaskCount: (id: number, isIncreasing: boolean) => void;
}

export const ListComponent = memo(
	({
		list,
		deleteList,
		setShowNameBox,
		setListInfo,
		updateTaskCount,
	}: ListComponentProp) => {
		//console.log(`List id: ${ list.id } rendered`);

		const [sortby, setSortBy] = useState<SortBy>(SortBy.UserOrder);
		const [mList] = useState<ListType>(() => cloneDeep(list) || null);
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

		const handleDeleteList = useCallback(() => {
			deleteList(list.id);
		}, [deleteList, list.id]);

		const handleRenameList = useCallback(() => {
			setListInfo(mList);
			setShowNameBox(true);
		}, [mList, setShowNameBox, setListInfo]);

		return (
			<div className="listComponent" hidden={!list.render}>
				{loading ? null : (
					<div>
						<div className="listHeader">
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
										handleRenameList,
									}}
								/>
							</div>
							<AddTaskButton onEmptyTask={handleEmptyTask} />
						</div>
						<div className="listTasks">
							{sortedTasks.map((value: TaskType) => {
								return (
									<Task
										givenTask={value}
										onDelete={handleDelete}
										onUpdate={handleUpdate}
										key={value.uuid}
										newTask={value.id == undefined}
										onNewTask={handleNewTask}
										onEmptyTask={handleEmptyTask}
									/>
								);
							})}
						</div>
					</div>
				)}
			</div>
		);
	},
);
