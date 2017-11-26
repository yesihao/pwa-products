import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Login from '../components/Login.js'
import actions from '../actions/login.js'

const selector = createStructuredSelector({
  mobile: x => x.get('mobile'),
  password: x => x.get('password'),
  error: x => x.get('error'),
})

export default connect(
  (state) => {
    return selector(state.get('login'))
  },
  actions,
)(Login)
