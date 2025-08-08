import { InvalidIdError } from '../error/customErrors.mjs';

export const idValidation = (id) => {
    if (!id || !Number.isInteger(Number(id))) {
        throw new InvalidIdError('Id is Invalid or not provided.');
    }
};
