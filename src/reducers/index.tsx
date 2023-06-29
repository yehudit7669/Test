import { combineReducers } from 'redux'
import auth from './authReducer'
import firstLoginParent from './firstLoginParentReducer'
import firstLoginTeacher from './firstLoginTeacherReducer'
import firstLoginStudent from './firstLoginStudentReducer'
import quoteRequest from './quoteReducer'
import customer from './customerReducer'

const rootReducer = () =>
  combineReducers({
    auth,
    firstLoginParent,
    firstLoginTeacher,
    firstLoginStudent,
    quoteRequest,
    customer,
  })

export default rootReducer
