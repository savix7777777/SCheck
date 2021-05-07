import {CHANGE_LOCATION} from "./actions";

export const createLocation = (payload) => {
    return {type: CHANGE_LOCATION, payload}
};