export interface TaskType {
	uuid: string;
	id?: number;
	name: string;
	completed?: boolean;
	date?: Date | null;
	time?: Time | null;
	description?: string;
	parentid: number | null;
	listid: number;
	sort_order: number;
}

export interface Time {
	hours: number;
	minutes: number;
}

export interface ListType {
	id: number;
	name: string;
}
