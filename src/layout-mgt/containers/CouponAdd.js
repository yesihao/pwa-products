import { connect } from 'react-redux'

import CouponEdt from '../components/CouponEdt'
import * as actions from '../actions/couponAdd'
import { selector } from './CouponEdt'

export default connect(
  (state) => {
    return selector(state.getIn(['layoutMgt', 'couponEdt']))
  },
  actions,
)(CouponEdt)
