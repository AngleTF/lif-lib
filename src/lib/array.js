const inArray = (val, arr) => {
    for (let i = 0, len = arr.length; i < len; i++) {
        if (val === arr[i]) {
            return true;
        }
    }
    return false;
};

const random = (min, max) => {
    return Math.round(Math.random() * (max - min)) + min;
};

export {
    inArray,
    random
};
