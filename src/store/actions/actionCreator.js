import {CHANGE_DOC_DATA, CHANGE_LOCATION} from "./actions";

export const createLocation = (payload) => {
    return {type: CHANGE_LOCATION, payload}
};


export const createDocData = (payload) => {
    return {type: CHANGE_DOC_DATA, payload}
};