import Actions from '../actions'
import { produce } from 'immer'

interface State {
  firstLoginParentDetails: {
    fname: string
    lname: string
    country: string
    childrens: { [key: string]: any }[]
    childEducation: { teachingMethod: string[]; other: string }
    goals: { options: string[]; otherGoals: string }
  }
  childEducationChipDetails: {
    id: string
    label: string
    selected: boolean
  }[]
  teachingGoalsChipDetails: {
    id: string
    label: string
    selected: boolean
  }[]
}

const initialState: State = {
  firstLoginParentDetails: {
    fname: '',
    lname: '',
    country: '',
    childrens: [
      {
        nickname: '',
        strengths: '',
        challenges: '',
        preferences: '',
        hobbies: '',
      },
    ],
    childEducation: { teachingMethod: [], other: '' },
    goals: { options: [], otherGoals: '' },
  },

  childEducationChipDetails: [
    { id: '1', label: 'Clickable', selected: false },
    { id: '2', label: 'Another', selected: false },
  ],

  teachingGoalsChipDetails: [
    { id: '1', label: 'Keep up on my child class activity', selected: false },
    {
      id: '2',
      label: 'To advance  my child beyond class program',
      selected: false,
    },
  ],
  // Temporary data - This data will be attained from API call
}

const firstLoginParent = produce((draft: State, action: any) => {
  const { payload } = action
  switch (action.type) {
    case Actions.SET_FIRST_LOGIN_PARENT_DETAILS:
      draft.firstLoginParentDetails = {
        ...draft.firstLoginParentDetails,
        ...payload,
      }
      break

    case Actions.FIRST_LOGIN_PARENT_STEPPER_TWO_ADD_CHILDREN:
      draft.firstLoginParentDetails.childrens = [
        ...draft.firstLoginParentDetails.childrens,
        { ...payload },
      ]
      break

    case Actions.FIRST_LOGIN_PARENT_STEPPER_TWO_REMOVE_CHILDREN:
      {
        const newChildrensArr = draft.firstLoginParentDetails.childrens.filter(
          (element, index) => {
            return index !== payload.index && element !== payload.data
          }
        )
        draft.firstLoginParentDetails.childrens = newChildrensArr
      }
      break

    case Actions.FIRST_LOGIN_PARENT_UPDATE_CHILD_EDUCATION_CHIP_DETAILS:
      draft.childEducationChipDetails = [...payload.multipleSelectableChipsArr]
      break

    case Actions.FIRST_LOGIN_PARENT_UPDATE_TEACHING_GOALS_CHIP_DETAILS:
      draft.teachingGoalsChipDetails = [...payload.multipleSelectableChipsArr]
      break

    default:
      break
  }
}, initialState)

export default firstLoginParent
