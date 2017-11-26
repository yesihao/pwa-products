import { fromTypes } from 'reax'
import { setCookie } from 'tjs'

import actions from '../actions/ActionTypes.js'
import stripKey from '../common/stripKey.js'
import loginApi from '../apis/login.js'
import history from '../history.js'

const acs = fromTypes(actions, stripKey('LOGIN_'))

function login() {
  return async (dispatch, getState) => {
    dispatch(acs.setError(undefined))

    const login = getState().get('login').toJS()
    if (login.mobile.length === 0) {
      return dispatch(acs.setError('请填写手机号'))
    }
    if (login.password.length === 0) {
      return dispatch(acs.setError('请填写密码'))
    }
    try {
      const ret = await loginApi(login.mobile, login.password)
      let { session, storeName, brandName, logo } = ret.result
      setCookie({
        s: session,
        store: storeName,
        brand: brandName,
        logo: logo,
      })

      history.push('/')
    } catch (e) {
      switch (e) {
      case 0x00200001:
        dispatch(acs.setError('用户尚未注册'))
        break
      case 0x00200002:
        dispatch(acs.setError('手机号已注册，但未设置密码'))
        break
      case 0x00200003:
        dispatch(acs.setError('密码错误'))
        break
      case 0x00200004:
        dispatch(acs.setError('没有登录权限'))
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
  login
}
