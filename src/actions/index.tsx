import * as authActions from "./authActions";
import * as createAction from "./createAction";
import keyMirror from "keymirror";

const actions = keyMirror({
  ...authActions,
});

export default {
  ...createAction,
  ...actions,
};
