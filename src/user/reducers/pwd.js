import { ha, keyedReducer } from 'reax'

import Pwd from '../common/Pwd.js'
import actions from '../../actions/ActionTypes.js'
const {
  USER_PWD_CHG_OLD_PWD,
  USER_PWD_CHG_NEW_PWD,
  USER_PWD_CHG_CFM_PWD,
  USER_PWD_SET_ERROR,
  USER_PWD_UNLOAD,
} = actions

export default ha({
  [USER_PWD_CHG_OLD_PWD]: keyedReducer('oldPwd'),
  [USER_PWD_CHG_NEW_PWD]: keyedReducer('newPwd'),
  [USER_PWD_CHG_CFM_PWD]: keyedReducer('cfmPwd'),
  [USER_PWD_SET_ERROR]: keyedReducer('error'),
  [USER_PWD_UNLOAD]: () => new Pwd(),
}, new Pwd())
