import Actions from '../actions'
import { produce } from 'immer'

interface State {
  customers: [
    {
      id: string
      schoolName: string
      firstName: string
      email: string
      updatedAt: string
      numberSeats: number
      link: string
      password: string
    }
  ]
  customer: {
    id: string
    schoolname: string
    firstname: string
    email: string
    updatedat: string
    numberseats: number
    link: string
    password: string
  }
}

const initialState: State = {
  customers: [
    {
      id: '',
      schoolName: '',
      firstName: '',
      email: '',
      updatedAt: '',
      numberSeats: 0,
      link: '',
      password: '',
    },
  ],
  customer: {
    id: '',
    schoolname: '',
    firstname: '',
    email: '',
    updatedat: '',
    numberseats: 0,
    link: '',
    password: '',
  },
}

const customer = produce((draft: State, action: any) => {
  const { payload } = action
  switch (action.type) {
    case Actions.NEW_CUSTOMER: {
      break
    }
    case Actions.GET_CUSTOMER_LIST: {
      draft.customers = payload.map((customer: any) => ({
        ...customer,
        updatedAt:
          customer.updatedat instanceof Date
            ? customer.updatedat.toString()
            : null,
      }))
      break
    }
    case Actions.GET_CUSTOMER: {
      draft.customer = { ...draft.customer, ...payload }
      break
    }
    default: {
      break
    }
  }
}, initialState)

export default customer
