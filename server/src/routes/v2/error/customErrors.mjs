export class ParentTaskNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ParentTaskNotFoundError';
        this.statusCode = 422;
    }
}

export class ParentIsSubError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ParentIsSubError';
        this.statusCode = 409;
    }
}
