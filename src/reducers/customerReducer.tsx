import Actions from '../actions'
import { produce } from 'immer'

interface State {
  customers: [
    {
      id: string
      schoolName: string
      firstName: string
      email: string
      updatedAt: Date
      numberSeats: number
      link: string
      password: string
    }
  ]
}

const initialState: State = {
  customers: [
    {
      id: '',
      schoolName: '',
      firstName: '',
      email: '',
      updatedAt: new Date(),
      numberSeats: 0,
      link: '',
      password: '',
    },
  ],
}

const customer = produce((draft: State, action: any) => {
  const { payload } = action
  switch (action.type) {
    case Actions.NEW_CUSTOMER: {
      break
    }
    case Actions.GET_CUSTOMERS: {
      draft.customers = [...payload] as State['customers']
      break
    }
    default: {
      break
    }
  }
}, initialState)

export default customer
