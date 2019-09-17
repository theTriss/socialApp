
export const required = (value) => {
    return value ? undefined : 'Field is required'
} 

export const maxlength = (maxlength) => {
    return (value) => {
        return  (value && value.length <= maxlength) ? undefined : `Max length is ${maxlength} symbols`;
    }
}

export const minlength = (minlength) => {
    return (value) => {
        return (value && value.length >= minlength) ? undefined : `Min length is ${minlength} symbols`;
    }
}

export const email = (value) => {
    return value && /^[A-Z0-9]+@[A-Z0-9]+\.[A-Z]{2,4}$/i.test(value) ? undefined : 'Incorect Email';
}