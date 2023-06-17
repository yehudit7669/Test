import * as authActions from "./authActions";
import * as signupActions from "./signupActions";
import * as firstLoginParentActions from "./firstLoginParentActions";
import * as firstLoginTeacherActions from "./firstLoginTeacherActions";
import * as firstLoginStudentActions from "./firstLoginStudentActions";
import * as createAction from "./createAction";
import keyMirror from "keymirror";

//Add all the actions here in actions object const to mirror actions
const actions = keyMirror({
  ...authActions,
  ...firstLoginParentActions,
  ...firstLoginTeacherActions,
  ...signupActions,
  ...firstLoginStudentActions,
});

//Exporting all the actions from folder
export default {
  ...createAction,
  ...actions,
};
