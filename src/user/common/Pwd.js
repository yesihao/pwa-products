import I from 'immutable'

const _Pwd = I.Record({
  oldPwd: '',
  newPwd: '',
  cfmPwd: '',
  error: undefined,
})

export default _Pwd
