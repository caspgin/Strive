export interface TaskType {
    uuid: string;
    id?: number;
    name: string;
    completed?: boolean;
    date?: Date | null;
    time?: Time | null;
    description?: string;
    parentid: number | null;
}

export interface Time {
    hours: number;
    minutes: number;
}
