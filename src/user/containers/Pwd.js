import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Pwd from '../components/Pwd.js'
import actions from '../actions/pwd.js'

const selector = createStructuredSelector({
  oldPwd: x => x.get('oldPwd'),
  newPwd: x => x.get('newPwd'),
  cfmPwd: x => x.get('cfmPwd'),
  error: x => x.get('error'),
})

export default connect(
  (state) => {
    return selector(state.getIn(['user', 'pwd']))
  },
  actions,
)(Pwd)
