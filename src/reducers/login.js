import { ha, keyedReducer } from 'reax'

import Login from '../common/Login.js'
import actions from '../actions/ActionTypes.js'
const {
  LOGIN_CHG_MOBILE,
  LOGIN_CHG_PASSWD,
  LOGIN_SET_ERROR,
  LOGIN_UNLOAD,
} = actions

export default ha({
  [LOGIN_CHG_MOBILE]: keyedReducer('mobile'),
  [LOGIN_CHG_PASSWD]: keyedReducer('password'),
  [LOGIN_SET_ERROR]: keyedReducer('error'),
  [LOGIN_UNLOAD]: () => new Login(),
}, new Login())
