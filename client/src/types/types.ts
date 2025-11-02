export interface TaskType {
    uuid: string;
    id?: number;
    name: string;
    completed: boolean;
    date?: Date | null;
    time?: Time | null;
    description?: string;
    parentid: number | null;
    listid: number;
    sort_order: number;
    completion_date: Date | null;
}

export interface Time {
    hours: number;
    minutes: number;
}

export interface ListType {
    id: number;
    name: string;
    num_of_pending_tasks: number;
    num_of_completed_tasks: number;
    render: boolean;
}

export interface RawTaskType {
    id?: number;
    name: string;
    completed: boolean;
    date?: string;
    time?: string;
    description?: string;
    parentid: number | null;
    listid: number;
    sort_order: number;
    completion_date?: string;
}

export interface Vector {
    x: number;
    y: number;
}

export enum SortBy {
    UserOrder = 'User Order',
    Alphabetically = 'Alphabetically',
    Date = 'Date',
}

export type ChangeTaskType =
    | 'AddPending'
    | 'AddCompleted'
    | 'DelCompleted'
    | 'DelPending'
    | 'PendingToCompleted'
    | 'CompletedToPending';
