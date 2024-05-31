// False -> Deny
// True -> Accept

export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const extractMssvFromEmail = (email: string) => {
    var regex = /[A-Z]{2}\d{5,6}/gi;

    var matches = email.toUpperCase().match(regex);

    return matches;
}

export const validateMssv = (mssv: string) => {
    var regex = /^[A-Z]{2}\d{5,6}$/i;

    // return regex.test(mssv);
    return mssv.length >= 6;
}