import * as authActions from './authActions'
import * as worksheetActions from './worksheetActions'
import * as createAction from './createAction'
import * as quoteRequestActions from './quoteRequestActions'
import * as customerActions from './customerActions'
import keyMirror from 'keymirror'

//Add all the actions here in actions object const to mirror actions
const actions = keyMirror({
  ...authActions,
  ...worksheetActions,
  ...quoteRequestActions,
  ...customerActions,
})

//Exporting all the actions from folder
export default {
  ...createAction,
  ...actions,
}
