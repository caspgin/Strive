export interface TaskType {
	uuid: string;
	id?: number;
	name: string;
	complete?: boolean;
	date?: Date | null;
	time?: Time | null;
	desc?: string;
}

export interface Time {
	hours: number;
	minutes: number;
}

export type UpdateResult =
	| { success: true; data?: unknown }
	| { success: false; data: unknown };
