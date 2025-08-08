import { useState, useRef } from 'react';
import '../css/task.css';
import { TaskType } from '../types/types';
import { TaskIcon } from './TaskIcon';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';
import { TaskName } from './TaskName';
import { TaskTime } from './TaskTime';
import { TaskDesc } from './TaskDesc';
import { TaskDropDown } from './TaskDropDown';

export interface TaskProps {
	givenTask: TaskType;
	onDelete: (uuid: string, id?: number) => void;
	onUpdate: (task: TaskType) => void;
	newTask?: boolean;
	onNewTask: (task: TaskType) => void;
	onEmptyTask: (id?: number) => void;
}

export const Task = ({
	givenTask,
	onDelete,
	onUpdate,
	newTask,
	onNewTask,
	onEmptyTask,
}: TaskProps) => {
	const [isNewTask, setIsNewTask] = useState<boolean>(() => newTask || false);
	const [isEditing, setIsEditing] = useState<boolean>(() => newTask || false);
	const [isHovered, setIsHovered] = useState<boolean>(true);
	const [task, setTask] = useState<TaskType>(() =>
		cloneDeep(givenTask || {}),
	);
	const ogTaskRef = useRef<TaskType>(cloneDeep(givenTask || {}));
	const taskRef = useRef<HTMLDivElement>(null);
	const isSubTask: boolean = task.parentid != null;
	function updateTask() {
		if (isNewTask) {
			setIsNewTask(false);
			if (isEqual(task, ogTaskRef.current)) {
				onDelete(task.uuid);
			} else {
				onNewTask(task);
			}
		} else {
			if (!isEqual(task, ogTaskRef.current)) {
				onUpdate(task);
			}
		}
	}

	function handleFocus() {
		if (!isEditing) {
			setIsEditing(true);
		}
	}

	function handleBlur() {
		setIsEditing(false);
		setIsHovered(false);
		updateTask();
	}

	function handleOnDelete() {
		onDelete(task.uuid, task.id);
	}

	function handleOnEmptyTask() {
		onEmptyTask(task.id);
	}

	return (
		<div
			className={`tasks ${isSubTask && 'subTask'} `}
			ref={taskRef}
			onClick={handleFocus}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className="taskContainer">
				<TaskIcon {...{ task, setTask }} />
				<div className="taskData">
					<TaskName
						{...{
							isEditing,
							task,
							setTask,
						}}
					/>
					{!isEditing && !task.description ? null : (
						<TaskDesc {...{ isEditing, task, setTask }} />
					)}
					{!isEditing && !task.date ? null : (
						<TaskTime {...{ task, isEditing, setTask }} />
					)}

					{isEditing ? (
						<div className="editButtonContainer">
							<button onClick={handleBlur} className="editButton">
								Done
							</button>
						</div>
					) : null}
				</div>
				{!isNewTask && isHovered && (
					<TaskDropDown
						{...{
							isEditing,
							isHovered,
							handleOnDelete,
							handleOnEmptyTask,
							isSubTask,
						}}
					/>
				)}
			</div>
		</div>
	);
};
