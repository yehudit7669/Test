import { combineReducers } from "redux";
import auth from "./authReducer";
import firstLoginParent from "./firstLoginParentReducer";
import firstLoginTeacher from "./firstLoginTeacherReducer";

const rootReducer = () =>
  combineReducers({
    auth,
    firstLoginParent,
    firstLoginTeacher
  });

export default rootReducer;
