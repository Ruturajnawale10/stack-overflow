import { combineReducers } from "redux";
import authenticationReducer from "./authenticationReducer";
const rootReducer = combineReducers({
    //list of reducers go here
    //ex authentication: authenticationReducer
    authentication: authenticationReducer,
});

export default rootReducer;