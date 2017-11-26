import { ha } from 'reax'

import actions from '../../actions/ActionTypes.js'
const {
  LAYOUT_MGT_MODEL_EDITING_GASHAPON_INIT,
  LAYOUT_MGT_MODEL_EDITING_GASHAPON_ADD_COUPON,
  LAYOUT_MGT_MODEL_EDITING_GASHAPON_DEL_COUPON,
  LAYOUT_MGT_MODEL_EDITING_GASHAPON_CHANGE_COUPON_RATIO,
} = actions
import Gashapon from '../common/Gashapon.js'
import SelectedCoupon from '../common/SelectedCoupon.js'

const COUPON_VALID = 1

export default ha({
  [LAYOUT_MGT_MODEL_EDITING_GASHAPON_INIT]: (_, action) => new Gashapon(action.payload),
  [LAYOUT_MGT_MODEL_EDITING_GASHAPON_ADD_COUPON]: (state, action) => {
    const [id, name, status] = action.payload

    return state.setIn(['coupons', id], new SelectedCoupon({ id, name, status }))
  },
  [LAYOUT_MGT_MODEL_EDITING_GASHAPON_DEL_COUPON]: (state, action) => {
    return state.deleteIn(['coupons', action.payload])
  },
  [LAYOUT_MGT_MODEL_EDITING_GASHAPON_CHANGE_COUPON_RATIO]: (state, action) => {
    const [id, ratio] = action.payload
    const others = state.get('coupons')
      .filter((_, k) => k !== id)
      .reduce((t, v) => t + (v.get('status') === COUPON_VALID ? v.get('ratio') : 0), 0)
    const left = state.get('total') - others

    if (left === 0) {
      return state
    }
    const n = parseInt(ratio) || 0
    return state.setIn(['coupons', id, 'ratio'], Math.min(left, n))
  }
}, new Gashapon())
