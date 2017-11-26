import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector, createSelector } from 'reselect'
import { Initable } from 'reax'

import GroundSigns from '../components/GroundSigns.js'
import * as actions from '../actions/groundSigns.js'

const { load, ...rest } = actions

const pictures = createSelector(
  x => x.get('pictures'),
  ps => ps.valueSeq(),
)
const selector = createStructuredSelector({
  pictures: createSelector(
    pictures,
    ps => ps.toJS(),
  ),
  uploading: createSelector(
    pictures,
    ps => ps.valueSeq().some(p => p.loading),
  )
})

export default compose(
  Initable({
    loadFn: load,
    loadingFn: (state) => state.getIn(['layoutMgt', 'groundSigns', 'loading'])
  }),
  connect(
    (state) => {
      const groundSigns = state.getIn(['layoutMgt', 'groundSigns'])
      return selector(groundSigns)
    },
    rest
  )
)(GroundSigns)
