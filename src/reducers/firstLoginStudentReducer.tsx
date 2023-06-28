import Actions from '../actions'
import { produce } from 'immer'

interface State {
  user: { status: boolean }
}

const initialState: State = {
  user: { status: false },
}

const firstLoginStudent = produce((draft: State, action: any) => {
  const { payload } = action
  switch (action.type) {
    case Actions.FIRST_LOGIN_STUDENT: {
      draft.user = { ...payload }
      break
    }

    default: {
      // Nothing to do
      break
    }
  }
}, initialState)

export default firstLoginStudent
