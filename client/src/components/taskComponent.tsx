import { useState, useRef } from 'react';
import '../css/task.css';
import { TaskType } from '../types/types';
import { TaskIcon } from './taskIcon';
import { TaskDelete } from './taskDelete';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';
import { TaskName } from './taskName';
import { TaskTime } from './taskTime';
import { TaskDesc } from './taskDesc';

export interface TaskProps {
	givenTask: TaskType;
	onDelete?: (uuid: string, id?: number) => void;
	onUpdate?: (task: TaskType) => void;
	newTask?: boolean;
	onNewTask?: (task: TaskType) => void;
}

export const Task = ({
	givenTask,
	onDelete,
	onUpdate,
	newTask,
	onNewTask,
}: TaskProps) => {
	const [isNewTask, setIsNewTask] = useState<boolean>(() => newTask || false);
	const [isEditing, setIsEditing] = useState<boolean>(() => newTask || false);
	const [task, setTask] = useState<TaskType>(() =>
		cloneDeep(givenTask || {}),
	);
	const [ogTask] = useState<TaskType>(() => cloneDeep(givenTask || {}));
	const [isComplete, setIsComplete] = useState<boolean>(false);
	const taskRef = useRef<HTMLDivElement>(null);

	function updateTask() {
		if (isNewTask) {
			setIsNewTask(false);
			if (isEqual(task, ogTask)) {
				onDelete?.(task.uuid);
			} else {
				onNewTask?.(task);
			}
		} else {
			if (!isEqual(task, ogTask)) {
				onUpdate?.(task);
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
		updateTask();
	}

	return (
		<div className="tasks" ref={taskRef} onClick={handleFocus}>
			<div className="taskContainer">
				<TaskIcon {...{ isComplete, setIsComplete }} />
				<div className="taskData">
					<TaskName
						{...{
							isComplete,
							isEditing,
							task,
							setTask,
						}}
					/>
					<TaskDesc {...{ isEditing, task, setTask }} />
					<TaskTime {...{ task, isEditing, setTask }} />
					<div className="editButtonContainer">
						{isEditing ? (
							<button onClick={handleBlur} className="editButton">
								Done
							</button>
						) : null}
					</div>
				</div>
				<TaskDelete {...{ onDelete, uuid: task.uuid, id: task.id }} />
			</div>
		</div>
	);
};
