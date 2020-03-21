export const updateObject = (oldObject, updatedObject) => {
    return {
        ...oldObject,
        ...updateObject
    }
};