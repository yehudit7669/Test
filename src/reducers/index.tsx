import { combineReducers } from 'redux'
import auth from './authReducer'
import firstLoginParent from './firstLoginParentReducer'
import firstLoginTeacher from './firstLoginTeacherReducer'
import firstLoginStudent from './firstLoginStudentReducer'

const rootReducer = () =>
  combineReducers({
    auth,
    firstLoginParent,
    firstLoginTeacher,
    firstLoginStudent,
  })

export default rootReducer
