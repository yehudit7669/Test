import Actions from "../actions";
import { produce } from "immer";

interface State {
  user: {
    role: string;
  };
}

const initialState: State = {
  user: {
    role: "",
  },
};

const auth =produce((draft: State, action: any) => {
  const { payload } = action;

  switch (action.type) {
    case Actions.USER_LOGIN: {
      draft.user = payload;
      break;
    }
    case Actions.SET_USER_ROLE: {
      draft.user = { ...draft.user, role: payload };
      break;
    }

    default: {
      // Nothing to do
      break;
    }
  }
}, initialState);

export default auth
