export class Task {
	constructor({
		name,
		date,
		time,
		completed,
		description,
		parentid,
		listid,
		sort_order,
		completion_date,
	}) {
		this.name = name || '';
		this.time = this.formatTime(time);
		this.date = date || null;
		this.completed = completed || false;
		this.description = description || null;
		this.parentid = parentid || null;
		this.listid = listid || 0;
		this.sort_order = sort_order;
		this.completion_date = completion_date || null;
	}
	formatTime(taskTime) {
		if (!taskTime) {
			return null;
		}
		const { hours, minutes } = taskTime;
		const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
		return timeString;
	}
}

export class List {
	constructor({
		name,
		render,
		num_of_pending_tasks,
		num_of_completed_tasks,
	}) {
		this.name = name;
		this.render = render == undefined || render == null ? true : render;
		this.num_of_pending_tasks = num_of_pending_tasks || 0;
		this.num_of_completed_tasks = num_of_completed_tasks || 0;
	}
}

export const ChangeTaskType = Object.freeze({
	PENDING_TO_COMPLETED: 0,
	COMPLETED_TO_PENDING: 1,
	ADD_PENDING: 2,
	ADD_COMPLETED: 3,
	DEL_PENDING: 4,
	DEL_COMPLETED: 5,
});
