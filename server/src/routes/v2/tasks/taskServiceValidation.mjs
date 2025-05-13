export const idValidation = (id) => {
    const id_num = Number(id);

    if (!Number.isInteger(id_num)) {
        throw new Error('Invalid id or type');
    }
};
