import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector, createSelector } from 'reselect'
import { Initable } from 'reax'

import SlctCponDlg from '../components/SlctCponDlg.js'
import actions from '../actions/slctCponDlg.js'

const selector = createStructuredSelector({
  cpons: createSelector(
    x => x.get('cpons'),
    x => x.get('added'),
    (cpons, added) => cpons.filter(cpon => !added.has(cpon.get('id'))).valueSeq().toJS()
  ),
  slcted: x => x.get('slcted')
})

export default compose(
  Initable({
    loadFn: (_, props) => actions.load(props.added),
    loadingFn: (state) => state.getIn(['layoutMgt', 'slctCponDlg', 'loading']),
    unloadFn: actions.unload
  }),
  connect(
    (state) => {
      return selector(state.getIn(['layoutMgt', 'slctCponDlg']))
    },
    actions,
  )
)(SlctCponDlg)
