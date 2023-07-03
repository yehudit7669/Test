import Actions from '../actions'
import { produce } from 'immer'

interface State {
  currentSheet: any
}

const initialState: State = {
  currentSheet: {},
}

const worksheet = produce((draft: State, action: any) => {
  const { payload } = action
  switch (action.type) {
    case Actions.FETCH_WORKSHEET: {
      const { worksheet } = payload
      draft.currentSheet = worksheet
      break
    }

    default: {
      // Nothing to do
      break
    }
  }
}, initialState)

export default worksheet
