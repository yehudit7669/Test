import Actions from '../actions'
import { produce } from 'immer'

interface State {
  teachers: [
    {
      firstName: string
      lastName: string
      email: string
      status: string
      impact: number
      workSheet: number
      asgmt: number
      students: number
      submitions: number
      lastLogin: string
      schoolName: string
    },
  ]
}

const initialState: State = {
  teachers: [
    {
      firstName: '',
      lastName: '',
      email: '',
      status: '',
      impact: 0,
      workSheet: 0,
      asgmt: 0,
      students: 0,
      submitions: 0,
      lastLogin: '',
      schoolName: '',
    },
  ],
}

const teacher = produce((draft: State, action: any) => {
  const { payload } = action
  switch (action.type) {
    case Actions.NEW_CUSTOMER: {
      break
    }
    case Actions.GET_TEACHERS: {
      draft.teachers = [...payload] as State['teachers']
      break
    }
    default: {
      break
    }
  }
}, initialState)

export default teacher
