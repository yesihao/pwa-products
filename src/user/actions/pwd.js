import { fromTypes } from 'reax'

import actions from '../../actions/ActionTypes.js'
import { notify } from '../../notify/actions'
import stripKey from '../../common/stripKey.js'
import { checkPassword } from '../../common'
import chgPwdApi from '../apis/chgPwd.js'

const acs = fromTypes(actions, stripKey('USER_PWD_'))

function chgPwd() {
  return async (dispatch, getState) => {
    dispatch(acs.setError(undefined))

    const { oldPwd, newPwd, cfmPwd } = getState().getIn(['user', 'pwd']).toJS()
    if (oldPwd.length === 0) {
      return dispatch(acs.setError('请填写原密码'))
    }
    if (newPwd.length === 0) {
      return dispatch(acs.setError('请填写新密码'))
    }
    if (cfmPwd.length === 0) {
      return dispatch(acs.setError('请再次填写新密码'))
    }
    if (!checkPassword(newPwd)) {
      return dispatch(acs.setError('新密码必须为6-18位，同时包含数字英文，请重新填写'))
    }
    if (newPwd !== cfmPwd) {
      return dispatch(acs.setError('新密码不一致，请重新填写'))
    }

    try {
      await chgPwdApi(oldPwd, newPwd, cfmPwd)
      dispatch(notify('密码修改成功', 'info'))
      dispatch(acs.unload())
    } catch (e) {
      switch (e) {
      case 0x00200003:
        dispatch(acs.setError('密码错误'))
        break
      case 0x00200005:
        dispatch(acs.setError('两次输入密码不一致'))
        break
      default:
        dispatch(acs.setError('未知错误'))
      }
      throw e
    }
  }
}

export default {
  ...acs,
  chgPwd
}
