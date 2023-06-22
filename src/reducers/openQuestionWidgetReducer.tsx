import Actions from "../actions";
import { produce } from "immer";

interface State {
  content : string,
  audio : {name:string, url:string},
  video : {name:string, url:string}
}

const initialState: State = {
  content : "",
  audio : {name : "", url:""},
  video : {name : "", url:""}
};

const openQuestionWidget = produce((draft: State, action: any) => {
  const { payload } = action;
  switch (action.type) {
    
    // case Actions.SET_USER_ROLE: {
    //   break;
    // }

    default: {
      // Nothing to do
      break;
    }
  }
}, initialState);

export default openQuestionWidget;
