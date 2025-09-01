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
    }) {
        this.name = name || '';
        this.time = this.formatTime(time);
        this.date = date || null;
        this.completed = completed || false;
        this.description = description || null;
        this.parentid = parentid || null;
        this.listid = listid || 0;
        this.sort_order = sort_order;
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
    constructor({ name, render, numoftasks }) {
        this.name = name;
        this.render = render || true;
        this.numoftasks = numoftasks || 0;
    }
}
