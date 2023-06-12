import { combineReducers } from "redux";
import auth from "./authReducer";
import firstLoginParent from "./firstLoginParentReducer";

const rootReducer = () =>
  combineReducers({
    auth,
    firstLoginParent
  });

export default rootReducer;
