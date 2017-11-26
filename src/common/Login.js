import I from 'immutable'

const _Login = I.Record({
  mobile: '',
  password: '',
  error: undefined,
  platform: 'web',
})

export default _Login
