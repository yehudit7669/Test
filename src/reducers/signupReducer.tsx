import Actions from '../actions'
import { produce } from 'immer'

interface State {
  user: {
    name: string
    role: string
    status: boolean
    token: string
    hasSignedInBefore: boolean
  }
}

const initialState: State = {
  user: {
    name: '',
    role: '',
    status: false,
    token: '',
    hasSignedInBefore: false,
  },
}

const signup = produce((draft: State, action: any) => {
  const { payload } = action
  console.log(payload, 'payload signup')
  switch (action.type) {
    case Actions.USER_SIGN_UP: {
      draft.user = { ...payload }
      break
    }

    default: {
      // Nothing to do
      break
    }
  }
}, initialState)

export default signup
