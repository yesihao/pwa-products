import { connect } from 'react-redux'
import { getCookie, delCookie } from 'tjs'

import history from '../history.js'
import MLayout from '../components/MLayout.js'

function logout() {
  let toLogout = confirm('确定要退出登录吗？')
  if (toLogout) {
    delCookie('s')
    history.push('/')
  }
}

export default connect(
  () => ({
    logout,
    avatar: getCookie('logo'),
    brand: getCookie('brand'),
    store: getCookie('store'),
  }),
  {},
)(MLayout)
