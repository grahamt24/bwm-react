import titleize from "titleize";

export const rentalType = (isShared) => {
    if(isShared){
        return "Shared"
    }
    else{
        return "Entire"
    }
};

export const toUpperCase = (value) => {
    if(value){
        return titleize(value);
    }
    else{
        return ""
    }
};