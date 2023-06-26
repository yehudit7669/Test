import { combineReducers } from 'redux'
import auth from './authReducer'
import firstLoginParent from './firstLoginParentReducer'
import firstLoginTeacher from './firstLoginTeacherReducer'
import firstLoginStudent from './firstLoginStudentReducer'
import worksheet from './worksheetReducer'

const rootReducer = () =>
  combineReducers({
    auth,
    firstLoginParent,
    firstLoginTeacher,
    firstLoginStudent,
    worksheet,
  })

export default rootReducer
