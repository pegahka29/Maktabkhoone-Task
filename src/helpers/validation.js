export const required = (val) =>
    (!!val) || 'This field is required';

export const email = val =>
    (!val || /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val)) || 'Enter a valid email';

export const englishAlphabet = (val) =>
    (!val || /^[a-zA-Z ]+$/.test(val)) ||'Enter only English characters'

export const englishAlphabetWithNumberAndSigns = (val) =>
    (!val || /^[a-zA-Z0-9 ?><,{}[\]\-_+=!@#$%^&*|'./\\()]+$/.test(val)) || 'Only English characters, numbers and signs are allowed'

export const validation = {
    required,
    email,
    englishAlphabet,
    englishAlphabetWithNumberAndSigns,
};
