import {combineReducers} from "redux";
import getLocation from "./getLocation";
import getDocData from "./getDocData";

export default combineReducers({
    getLocation,
    getDocData,
});
