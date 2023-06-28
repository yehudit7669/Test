import Actions from '../actions'
import { produce } from 'immer'

interface State {
  customers: []
}

const initialState: State = {
  customers: []
}

const customer = produce((draft: State, action: any) => {
  const { payload } = action
  switch (action.type) {
    case Actions.NEW_CUSTOMER: {
      draft.customers = payload
      break
    }
    default: {
      // Nothing to do
      break
    }
  }
}, initialState)

export default customer
