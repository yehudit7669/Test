import { combineReducers } from 'redux'
import auth from './authReducer'
import firstLoginParent from './firstLoginParentReducer'
import firstLoginTeacher from './firstLoginTeacherReducer'
import firstLoginStudent from './firstLoginStudentReducer'
import worksheet from './worksheetReducer'
import quoteRequest from './quoteReducer'
import customer from './customerReducer'

const rootReducer = () =>
  combineReducers({
    auth,
    firstLoginParent,
    firstLoginTeacher,
    firstLoginStudent,
    worksheet,
    quoteRequest,
    customer,
  })

export default rootReducer
