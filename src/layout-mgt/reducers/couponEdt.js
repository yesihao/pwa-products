import { ha, keyedReducer } from 'reax'

import CouponEdt, { File } from '../common/CouponEdt.js'

import actions from '../../actions/ActionTypes.js'
const {
  LAYOUT_MGT_COUPON_EDT_UPDATE_FIELDS,
  LAYOUT_MGT_COUPON_EDT_CONVERT_FILE,
  LAYOUT_MGT_COUPON_EDT_CLEAR_FILE,
  LAYOUT_MGT_COUPON_EDT_SET_FILE_ERROR_URL,
  LAYOUT_MGT_COUPON_EDT_RESET,
  LAYOUT_MGT_COUPON_EDT_LOADED,
} = actions

export default ha({
  [LAYOUT_MGT_COUPON_EDT_UPDATE_FIELDS]: keyedReducer((_, a) => a.payload[0], x => x[1]),
  [LAYOUT_MGT_COUPON_EDT_RESET]: () => new CouponEdt(),
  [LAYOUT_MGT_COUPON_EDT_CONVERT_FILE]: {
    pending: keyedReducer('file', name => new File({ name })),
    resolve: keyedReducer(['file', 'codeBase64']),
    reject: keyedReducer('file', () => new File()),
  },
  [LAYOUT_MGT_COUPON_EDT_CLEAR_FILE]: keyedReducer('file', () => new File()),
  [LAYOUT_MGT_COUPON_EDT_SET_FILE_ERROR_URL]: keyedReducer(['file', 'errUrl']),
  [LAYOUT_MGT_COUPON_EDT_LOADED]: (_, action) => {
    let coupon = action.payload
    coupon.loading = false
    coupon.limitation = coupon.minConsume === undefined ? false : true

    return new CouponEdt(coupon)
  },
}, new CouponEdt())
