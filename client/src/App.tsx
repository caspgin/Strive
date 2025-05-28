import { useEffect, useState } from 'react';
import './css/App.css';
import { Task } from './components/taskComponent.tsx';
import axios from 'axios';
import { TaskType } from './types/types.js';
import { AddTaskButton } from './components/addTaskComponent.tsx';
import { Dropdown } from './components/VersionSettingDropDown.tsx';
import { v4 as uuidv4 } from 'uuid';
import { normalizeTaskArray } from './utilities/DatePickerUtility.tsx';

function App() {
	const [loading, setLoading] = useState(true);
	const [tasks, setTasks] = useState<TaskType[]>(() => {
		return Array<TaskType>();
	});
	const [version, setVersion] = useState<string>('v2');

	useEffect(() => {
		fetchTasks().then(() => {
			tasks.sort();
			setTimeout(() => setLoading(false), 1000);
		});
	}, [version]);

	const fetchTasks = async () => {
		try {
			const response = await axios.get(`/${version}/tasks/`);
			const data: TaskType[] = normalizeTaskArray(response.data);
			console.log(data);
			setTasks(() => data);
		} catch (error) {
			console.log(error);
		}
	};
	const handleUpdate = async (task: TaskType) => {
		const uuid = task.uuid;
		console.log(task);
		axios
			.put(`/${version}/tasks/${Number(task.id)}`, {
				task,
			})
			.then(() => {
				setTasks((prev) =>
					prev.map((value) => (value.uuid === uuid ? task : value)),
				);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleDelete = async (uuid: string, id?: number) => {
		try {
			if (id !== undefined) {
				await axios.delete(`/${version}/tasks/${id}`);
			}
			setTasks((prev) => prev.filter((value) => value.uuid !== uuid));
		} catch (err) {
			console.log(err);
		}
	};

	const handleNewTask = (task: TaskType) => {
		const uuid = task.uuid;
		axios
			.post(`/${version}/tasks/create`, { task })
			.then((response) => {
				setTasks((prev) =>
					prev
						.map((value) =>
							value.uuid === uuid
								? { ...response.data, uuid: uuid }
								: value,
						)
						.sort(),
				);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleEmptyTask = () => {
		const task: TaskType = {
			uuid: uuidv4(),
			name: '',
		};

		setTasks((prev) => [task, ...prev]);
		console.log(tasks);
	};
	return (
		<div id="app">
			<div>
				<Dropdown version={version} setVersion={setVersion} />
			</div>
			<div>
				{loading ? (
					<Task
						givenTask={{
							name: 'loading',
							uuid: uuidv4(),
						}}
					/>
				) : (
					<div>
						<AddTaskButton onEmptyTask={handleEmptyTask} />
						{tasks.map((value: TaskType) => (
							<Task
								givenTask={value}
								onDelete={handleDelete}
								onUpdate={handleUpdate}
								key={value.uuid}
								newTask={value.id == undefined}
								onNewTask={handleNewTask}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
