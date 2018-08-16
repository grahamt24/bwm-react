import titleize from "titleize";
import * as moment from "moment";

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

export const formatDate = (date) => {
    return moment(date).format("MMM Do YYYY");
};

export const getRangeOfDates = (startAt, endAt, dateFormat = "MM/DD/Y") => {
    const tempDates = [];
    const mEndAt = moment(endAt);
    let mStartAt = moment(startAt);
    while(mStartAt < mEndAt){
        tempDates.push(mStartAt.format(dateFormat));
        mStartAt = mStartAt.add(1, "day");
    }
    tempDates.push(mEndAt.format(dateFormat));
    return tempDates;
};