import Actions from "../actions";
import { produce } from "immer";

interface State {
    firstLoginParentDetails:{
        fname:string,
        lname:string,
        country:string,
        childrens: {nickname:string,strenghts:string,challenges:string,preferences:string,hobbies:string}[],
        childEducation:{teachingMethod:string[],other:string},
        goals:{options:string[],other:string}
    }
}

const initialState: State = {
    firstLoginParentDetails:{
        fname:"",
        lname:"",
        country:"",
        childrens:[],
        childEducation:{teachingMethod:[],other:""},
        goals:{options:[],other:""}
    }
};

const firstLoginParent = produce((draft: State, action: any) => {
  const { payload } = action;
  switch (action.type) {
    case Actions.SET_FIRST_LOGIN_PARENT_DETAILS_FOR_STEPPER_ONE: 
      draft.firstLoginParentDetails = { ...draft.firstLoginParentDetails,...payload };
      break;

    default: 
      break;
  }
}, initialState);

export default firstLoginParent
