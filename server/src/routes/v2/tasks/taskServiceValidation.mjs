import { InvalidIdError, InvalidName } from '../error/customErrors.mjs';

export const idValidation = (id) => {
    if (id === 0) {
        return;
    }
    if (!Number.isInteger(Number(id)) || !id || id < 0) {
        throw new InvalidIdError('Id is Invalid or not provided.');
    }
};

export const nameValidation = (name) => {
    if (!name) {
        throw new InvalidName('A proper name for the list must be provided');
    }
};
