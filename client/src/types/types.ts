export interface TaskType {
    id: number;
    name: string;
    complete?: boolean;
}

export type UpdateResult =
    | { success: true }
    | { success: false; data: unknown };
