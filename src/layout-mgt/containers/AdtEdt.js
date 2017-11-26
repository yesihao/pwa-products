import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector, createSelector } from 'reselect'
import { Initable } from 'reax'

import AdtEdt from '../components/AdtEdt.js'
import actions from '../actions/adtEdt.js'

const selector = createStructuredSelector({
  style: x => x.get('style'),
  title: x => x.get('title'),
  description: x => x.get('description'),
  text: x => x.get('text'),
  pictures: createSelector(
    x => x.get('pictures'),
    xs => xs.valueSeq().toJS()
  ),
  canAddPicture: x => x.get('pictures').size < 5,
  corner: createSelector(
    x => x.get('corner'),
    corner => corner && corner.toJS()
  ),
  video: createSelector(
    x => x.get('video'),
    video => video.toJS()
  )
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
      const adtEdt = layoutMgt.get('adtEdt')
      return {
        ...selector(adtEdt),
        invalid: !bscEdt.validate() || !adtEdt.validate()
      }
    },
    actions,
  )
)(AdtEdt)
