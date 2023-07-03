import Actions from '../actions'
import { produce } from 'immer'

export enum StatusQuote {
  Pending = 'Pending',
  QuoteSent = 'Quote_sent',
  Done = 'Done',
}

interface State {
  quoteRequest: [
    {
      id: string
      schoolName?: string
      ownerName?: string
      ownerEmail?: string
      currentSeats?: string
      seatsRequest: string
      status: StatusQuote
      updatedAt: Date
    }
  ]
}

const initialState: State = {
  quoteRequest: [
    {
      id: '',
      schoolName: '',
      ownerName: '',
      ownerEmail: '',
      currentSeats: '',
      seatsRequest: '',
      status: StatusQuote.QuoteSent,
      updatedAt: new Date(),
    },
  ],
}

const quote = produce((draft: State, action: any) => {
  const { payload } = action
  switch (action.type) {
    case Actions.QUOTE_REQUEST: {
      draft.quoteRequest = [...payload] as State['quoteRequest']
      break
    }
    default: {
      break
    }
  }
}, initialState)

export default quote
