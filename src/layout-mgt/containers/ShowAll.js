import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector, createSelector } from 'reselect'
import { Initable } from 'reax'

import ShowAll from '../components/ShowAll.js'
import actions from '../actions/showall.js'

const selector = createStructuredSelector({
  plans: createSelector(
    x => x.get('plans'),
    plans => plans.valueSeq().toJS()
  )
})

export default compose(
  Initable({
    loadFn: actions.load,
    loadingFn: (state) => {
      return state.getIn(['layoutMgt', 'showall', 'loading'])
    },
    unloadFn: actions.unload
  }),
  connect(
    (state) => {
      return selector(state.getIn(['layoutMgt', 'showall']))
    },
    actions,
  ),
)(ShowAll)
