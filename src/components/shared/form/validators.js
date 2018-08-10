
const minLength = min => value => {
    if(value && value.length < min){
        return `Must be at least ${min} characters long.`;
    }
    else{
        return undefined;
    }
};

export const minLength4 = minLength(4);

export const required = (value) => {
    if(value){
        return undefined;
    }
    else{
        return "This input is required!";
    }
};