import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector, createSelector } from 'reselect'
import { Initable } from 'reax'

import ConfirmUpdateDlg from '../components/ConfirmUpdateDlg.js'
import actions from '../actions/confirmUpdateDlg.js'

const selector = createStructuredSelector({
  added: createSelector(
    x => x.get('added'),
    added => added.toJS()
  ),
  modified: createSelector(
    x => x.get('modified'),
    modified => modified.toJS()
  ),
  deleted: createSelector(
    x => x.get('deleted'),
    deleted => deleted.toJS()
  )
})

export default compose(
  Initable({
    loadFn: (_, props) => actions.load(props.id),
    loadingFn: (state) => state.getIn(['layoutMgt', 'confirmUpdateDlg', 'loading']),
    unloadFn: actions.unload,
  }),
  connect(
    (state) => {
      return selector(state.getIn(['layoutMgt', 'confirmUpdateDlg']))
    },
    actions,
  )
)(ConfirmUpdateDlg)
