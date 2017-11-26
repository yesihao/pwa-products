import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector, createSelector } from 'reselect'
import { Initable } from 'reax'

import LndScrEdt from '../components/LndScrEdt.js'
import actions from '../actions/lndScrEdt.js'

const selector = createStructuredSelector({
  style: x => x.get('style'),
  video: createSelector(
    x => x.get('video'),
    video => video.toJS()
  ),
  pictures: createSelector(
    x => x.get('pictures'),
    pics => pics.valueSeq().map(x => x.toObject()).toArray()
  ),
  showAddPic: x => x.get('pictures').size < 50,
})

export default compose(
  Initable({
    loadFn: (state, props) => actions.load(props.data, props.readonly),
    loadingFn: () => false
  }),
  connect(
    (state) => {
      const layoutMgt = state.get('layoutMgt')
      const bscEdt = layoutMgt.get('bscEdt')
      const lndScrEdt = layoutMgt.get('lndScrEdt')
      return {
        ...selector(lndScrEdt),
        invalid: !bscEdt.validate() || !lndScrEdt.validate()
      }
    },
    actions,
  )
)(LndScrEdt)
