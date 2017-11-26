import I from 'immutable'

import { ha, keyedReducer } from 'reax'
import actionTypes from '../../actions/ActionTypes'
import { formatDate } from 'tjs'

const {
  LAYOUT_MGT_COUPONS_RESET,
  LAYOUT_MGT_COUPONS_LOADED,
  LAYOUT_MGT_COUPONS_UPDATE_FILTERS,
  LAYOUT_MGT_COUPONS_CHANGE_ORDER,
  LAYOUT_MGT_COUPONS_RESET_FILTERS,
  LAYOUT_MGT_COUPONS_PAGE_TO,
  LAYOUT_MGT_COUPONS_CHANGE_PAGE_SIZE,
} = actionTypes

const INIT_FILTERS = I.fromJS({
  name: '',
  keyword: '',
  expire: '',
})

const INIT_STATE = I.fromJS({
  loading: true,
  coupons: null,
  page: 1,
  pageSize: 10,
  filters: INIT_FILTERS,
})

export default ha({
  [LAYOUT_MGT_COUPONS_RESET]: () => INIT_STATE,
  [LAYOUT_MGT_COUPONS_LOADED]: (state, action) => {
    let coupons = I.fromJS(action.payload)
    coupons = coupons.map(coupon =>
      coupon
        .set('startTimeString', formatDate(new Date(coupon.get('startTime') * 1000), 'yyyy-MM-dd HH:mm:ss'))
        .set('endTimeString', formatDate(new Date(coupon.get('endTime') * 1000), 'yyyy-MM-dd HH:mm:ss'))
        .set('updateTimeString', formatDate(new Date(coupon.get('updateTime') * 1000), 'yyyy-MM-dd HH:mm:ss'))
    )
    // coupons = coupons.sortBy(m => m.get('name'))
    return state.set('coupons', coupons).set('loading', false)
  },
  [LAYOUT_MGT_COUPONS_UPDATE_FILTERS]: keyedReducer((state, action) => ['filters'].concat([action.payload[0]]), x => x[1]),
  [LAYOUT_MGT_COUPONS_RESET_FILTERS]: (state) => state.set('filters', INIT_FILTERS),
  [LAYOUT_MGT_COUPONS_CHANGE_ORDER]: (state, action) => state.updateIn(['filters', 'order'], order => {
    let key = action.payload[0]
    if (order === null) {
      return I.Map({
        k: key,
        v: 'desc'
      })
    } else if (order.get('k') === key) {
      return order.get('v') === 'asc' ? null : order.set('v', 'asc')
    } else {
      return order.set('k', key).set('v', 'desc')
    }
  }),
  [LAYOUT_MGT_COUPONS_PAGE_TO]: keyedReducer('page'),
  [LAYOUT_MGT_COUPONS_CHANGE_PAGE_SIZE]: keyedReducer('pageSize'),
}, INIT_STATE)
