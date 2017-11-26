import { get, post } from '.'
import { encryptPassword } from '../common'

export default (mobile, password) => {
  return post('/wc/user/v1/login', {
    mobile,
    password: encryptPassword(password),
    platform: 'web'
  })
}

export function check() {
  return get('/wc/user/v1/check')
}
