import * as authActions from './authActions'
import * as signupActions from './signupActions'
import * as firstLoginParentActions from './firstLoginParentActions'
import * as firstLoginTeacherActions from './firstLoginTeacherActions'
import * as firstLoginStudentActions from './firstLoginStudentActions'
import * as worksheetActions from './worksheetActions'
import * as createAction from './createAction'
import * as quoteRequestActions from './quoteRequestActions'
import * as customerActions from './customerActions'
import * as teacherActions from './teacherActions'
import keyMirror from 'keymirror'

//Add all the actions here in actions object const to mirror actions
const actions = keyMirror({
  ...authActions,
  ...firstLoginParentActions,
  ...firstLoginTeacherActions,
  ...signupActions,
  ...firstLoginStudentActions,
  ...worksheetActions,
  ...quoteRequestActions,
  ...customerActions,
  ...teacherActions,
})

//Exporting all the actions from folder
export default {
  ...createAction,
  ...actions,
}
