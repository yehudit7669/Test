import * as authActions from "./authActions";
import * as firstLoginParentActions from "./firstLoginParentActions";
import * as createAction from "./createAction";
import keyMirror from "keymirror";

//Add all the actions here in actions object const to mirror actions
const actions = keyMirror({
  ...authActions,
  ...firstLoginParentActions
});

//Exporting all the actions from folder
export default {
  ...createAction,
  ...actions,
};
