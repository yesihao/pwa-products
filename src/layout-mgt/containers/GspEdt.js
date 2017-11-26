import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector, createSelector } from 'reselect'
import { Initable } from 'reax'

import GspEdt from '../components/GspEdt.js'

import gashaponActions from '../actions/gspEdt.js'

const COUPON_VALID = 1

const selector = createStructuredSelector({
  total: createSelector(
    x => x.get('total'),
    x => x.get('coupons'),
    (t, xs) => t - xs.valueSeq().reduce((t, x) => t + (x.get('status') === COUPON_VALID ? x.get('ratio') : 0), 0)
  ),
  coupons: x => x.get('coupons').valueSeq().toJS(),
})

export default compose(
  Initable({
    loadFn: (_, props) => gashaponActions.load(props.data, props.readonly),
    loadingFn: () => false
  }),
  connect(
    (state) => {
      const layoutMgt = state.get('layoutMgt')
      const gspEdt = layoutMgt.get('gspEdt')
      const bscEdt = layoutMgt.get('bscEdt')
      return {
        ...selector(gspEdt),
        invalid: !gspEdt.validate() || !bscEdt.validate()
      }
    },
    gashaponActions,
  )
)(GspEdt)
