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

export class InvalidIdError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidIdError';
        this.statusCode = 422;
    }
}

export class InvalidName extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidNameError';
        this.statusCode = 422;
    }
}
