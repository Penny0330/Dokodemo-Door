import AddBox from "./AddBox";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    AddBox: AddBox,
})

export default allReducers;