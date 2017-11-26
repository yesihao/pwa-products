import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import { withRouter } from 'react-router'
import { Initable } from 'reax'

import Layout from '../components/Layout'
import actions from '../actions/layout'

const { load, reset, changeDisplay } = actions

const selector = createStructuredSelector({
  display: x => x.getIn(['filters', 'display']),
})

export default withRouter(compose(
  Initable({
    loadFn: load,
    loadingFn: (state) => state.getIn(['layoutMgt', 'layout', 'loading']),
    unloadFn: reset,
  }),
  connect(
    (state) => {
      const layout = state.getIn(['layoutMgt', 'layout'])
      return selector(layout)
    },
    {
      changeDisplay
    },
  ),
)(Layout))
