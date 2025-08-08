export class Task {
    constructor(
        taskName,
        taskDate,
        taskTime,
        taskCompleted,
        taskDesc,
        taskparentId,
        sort_order,
    ) {
        this.name = taskName || '';
        this.time = this.formatTime(taskTime);
        this.date = taskDate || null;
        this.completed = taskCompleted || false;
        this.description = taskDesc || null;
        this.parentid = taskparentId || null;
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
