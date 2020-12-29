const emailCheck = (emailVal) => {
    return /^[\w-]+@[\w-]+\.[\w-]+$/.test(emailVal);
};

export {
    emailCheck
};
