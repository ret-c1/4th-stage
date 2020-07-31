// 议程
export const mainArr = (arr, a) => {
    if (arr === null) {
        return [];
    }
    const newA = arr.filter((v) => v.Field0026.String.indexOf(a) >= 0);
    return newA;
};

export const secondaryArr = (arr, a) => {
    if (arr === null) {
        return [];
    }
    const newA = arr.filter((v) => v.Field0026.String.indexOf(a) < 0);
    return newA;
};

export const idArr = (arr, a) => {
    if (arr === null) {
        return [];
    }
    const newA = arr.filter((v) => v.Id.String === a);
    return newA;
};
