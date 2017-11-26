import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector, createSelector } from 'reselect'
import { Initable } from 'reax'

import SlctRowItemDlg from '../components/SlctRowItemDlg.js'
import actions from '../actions/slctRowItemDlg.js'

const selector = createStructuredSelector({
  title: x => x.get('title'),
  style: x => x.get('style'),
  description: x => x.get('description'),
  pictures: createSelector(
    x => x.get('pictures'),
    xs => xs.valueSeq().toJS()
  ),
  canAddPicture: x => x.get('pictures').size < 5,
  thumb: createSelector(
    x => x.get('thumb'),
    thumb => thumb && thumb.toJS()
  ),
  video: createSelector(
    x => x.get('video'),
    video => video.toJS()
  ),
})

export default compose(
  Initable({
    loadFn: actions.load,
    loadingFn: () => false
  }),
  connect(
    (state) => {
      state = state.getIn(['layoutMgt', 'slctRowItemDlg'])
      return {
        ...selector(state),
        invalid: !state.validate()
      }
    },
    actions,
  )
)(SlctRowItemDlg)
