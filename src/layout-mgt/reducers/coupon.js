import I from 'immutable'
import { ha, keyedReducer } from 'reax'

import actions from '../../actions/ActionTypes.js'
const {
  LAYOUT_MGT_COUPON_VIEW_RESET,
  LAYOUT_MGT_COUPON_VIEW_LOADED,
  LAYOUT_MGT_COUPON_VIEW_CODE_PAGE_TO,
  LAYOUT_MGT_COUPON_VIEW_CODE_LOADED,
} = actions

const INIT_STATE = I.fromJS({
  loading: true,
  codePage: 1,
  codePageSize: 10,
})

export default ha({
  [LAYOUT_MGT_COUPON_VIEW_LOADED]: (state, action) => {
    let coupon = action.payload
    return state.merge(coupon).set('loading', false)
  },
  [LAYOUT_MGT_COUPON_VIEW_RESET]: () => INIT_STATE,
  [LAYOUT_MGT_COUPON_VIEW_CODE_PAGE_TO]: keyedReducer('codePage'),
  [LAYOUT_MGT_COUPON_VIEW_CODE_LOADED]: (state, action) => {
    let [codes, codeTotal] = action.payload
    return state.merge({ codes, codeTotal })
  },
}, INIT_STATE)
