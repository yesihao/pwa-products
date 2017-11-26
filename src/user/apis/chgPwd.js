import { patch } from '../../apis'
import { encryptPassword } from '../../common'

export default function chgPwd(oldPassword, newPassword, confirmPassword) {
  return patch('/wc/user/v1/password', {
    oldPassword: encryptPassword(oldPassword),
    newPassword: encryptPassword(newPassword),
    confirmPassword: encryptPassword(confirmPassword),
  })
}
