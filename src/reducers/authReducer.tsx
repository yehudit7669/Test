import Actions from "../actions";
import { produce } from "immer";

interface State {
  user: {};
}

const initialState: State = {
  user: {},
};

export default produce((draft: State, action: any) => {
  const { payload } = action;

  switch (action.type) {
    case Actions.USER_LOGIN: {
      draft.user = payload;
      break;
    }

    default: {
      // Nothing to do
      break;
    }
  }
}, initialState);
