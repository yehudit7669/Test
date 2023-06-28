import Actions from '../actions'
import { produce } from 'immer'

interface State {
  firstLoginTeacherDetails: {
    fname: string
    lname: string
    country: string
    teacherRoles: { roles: string[]; otherRoles: string }
    subjects: { subjectNames: string[]; otherSubjects: string }
    studentClasses: { classes: string[]; otherClasses: string }
    wizerInterests: { interests: string[]; otherInterests: string }
    school_Id: string
  }
  teacherRolesChipDetails: {
    id: string
    label: string
    selected: boolean
  }[]
  subjectsInterestChipDetails: {
    id: string
    label: string
    selected: boolean
  }[]
  studentsGradeChipDetails: {
    id: string
    label: string
    selected: boolean
  }[]
  wizerInterestsChipDetails: {
    id: string
    label: string
    selected: boolean
  }[]
  schoolDetails: {
    id: string
    schoolName: string
    schoolAddress: string
    totalNoOfTeachers: string
    selected: boolean
  }[]
}

const initialState: State = {
  firstLoginTeacherDetails: {
    fname: '',
    lname: '',
    country: '',
    teacherRoles: { roles: [], otherRoles: '' },
    subjects: { subjectNames: [], otherSubjects: '' },
    studentClasses: { classes: [], otherClasses: '' },
    wizerInterests: { interests: [], otherInterests: '' },
    school_Id: '',
  },
  // Temporary data - This data will be attained from API call
  teacherRolesChipDetails: [
    { id: '1', label: 'Principal', selected: false },
    { id: '2', label: 'Tutor', selected: false },
    { id: '3', label: 'Technical Advisor', selected: false },
  ],
  // Temporary data - This data will be attained from API call

  // Temporary data - This data will be attained from API call
  subjectsInterestChipDetails: [
    { id: '1', label: 'Arts', selected: false },
    { id: '2', label: 'Biology', selected: false },
    { id: '3', label: 'History', selected: false },
    { id: '4', label: 'Maths', selected: false },
    { id: '5', label: 'English', selected: false },
    { id: '6', label: 'History', selected: false },
  ],
  // Temporary data - This data will be attained from API call

  // Temporary data - This data will be attained from API call
  studentsGradeChipDetails: [
    { id: '1', label: '1st', selected: false },
    { id: '2', label: '2nd', selected: false },
    { id: '3', label: '3rd', selected: false },
    { id: '4', label: '4rth', selected: false },
    { id: '5', label: '5th', selected: false },
    { id: '6', label: '6th', selected: false },
  ],
  // Temporary data - This data will be attained from API call

  // Temporary data - This data will be attained from API call
  wizerInterestsChipDetails: [
    { id: '1', label: 'Premade worksheets', selected: false },
    { id: '2', label: 'To digitize pdf worksheet', selected: false },
    {
      id: '3',
      label: 'Easy way to differentiate assignments',
      selected: false,
    },
    {
      id: '4',
      label: 'Create fun worksheets for my students',
      selected: false,
    },
    { id: '5', label: 'Selling resources', selected: false },
  ],
  // Temporary data - This data will be attained from API call

  // Temporary data - This data will be attained from API call
  schoolDetails: [
    {
      id: '1',
      schoolName: 'School 1',
      schoolAddress: '5656 S 129th E Ave, Tulsa, OK 74134, United States',
      totalNoOfTeachers: '10',
      selected: false,
    },
    {
      id: '2',
      schoolName: 'School 2',
      schoolAddress: '5656 S 129th E Ave, Tulsa, OK 74134, United States',
      totalNoOfTeachers: '4',
      selected: false,
    },
    {
      id: '3',
      schoolName: 'School 3',
      schoolAddress: '5656 S 129th E Ave, Tulsa, OK 74134, United States',
      totalNoOfTeachers: '6',
      selected: false,
    },
    {
      id: '4',
      schoolName: 'School 4',
      schoolAddress: '5656 S 129th E Ave, Tulsa, OK 74134, United States',
      totalNoOfTeachers: '9',
      selected: false,
    },
    {
      id: '5',
      schoolName: 'School 5',
      schoolAddress: '5656 S 129th E Ave, Tulsa, OK 74134, United States',
      totalNoOfTeachers: '9',
      selected: false,
    },
  ],
  // Temporary data - This data will be attained from API call
}

const firstLoginTeacher = produce((draft: State, action: any) => {
  const { payload } = action
  switch (action.type) {
    case Actions.SET_FIRST_LOGIN_TEACHER_DETAILS:
      draft.firstLoginTeacherDetails = {
        ...draft.firstLoginTeacherDetails,
        ...payload,
      }
      break

    case Actions.FIRST_LOGIN_TEACHER_UPDATE_TEACHER_ROLES_CHIP_DETAILS:
      draft.teacherRolesChipDetails = [...payload.multipleSelectableChipsArr]
      break

    case Actions.FIRST_LOGIN_TEACHER_UPDATE_SUBJECTS_INTEREST_CHIP_DETAILS:
      draft.subjectsInterestChipDetails = [
        ...payload.multipleSelectableChipsArr,
      ]
      break

    case Actions.FIRST_LOGIN_TEACHER_UPDATE_STUDENTS_GRADE_CHIP_DETAILS:
      draft.studentsGradeChipDetails = [...payload.multipleSelectableChipsArr]
      break

    case Actions.FIRST_LOGIN_TEACHER_UPDATE_WIZER_INTERESTS_CHIP_DETAILS:
      draft.wizerInterestsChipDetails = [...payload.multipleSelectableChipsArr]
      break

    case Actions.FIRST_LOGIN_TEACHER_UPDATE_SCHOOL_DETAILS:
      {
        const refactoredSchoolDetails = draft.schoolDetails?.map((_data) => {
          return {
            ..._data,
            selected: _data.id === payload.eventTargetValue ? true : false,
          }
        })
        draft.schoolDetails = [...refactoredSchoolDetails]
      }
      break

    default:
      break
  }
}, initialState)

export default firstLoginTeacher
