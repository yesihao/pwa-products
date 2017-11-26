import { connect } from 'react-redux'
import { compose } from 'redux'
import { createSelector, createStructuredSelector } from 'reselect'
import { Initable } from 'reax'

import Coupons from '../components/Coupons'
import actions from '../actions/coupons'

const { load, reset, ...rest } = actions

const filteredCoupons = createSelector(
  x => x.get('coupons'),
  x => x.get('filters'),
  (coupons, filters) => {
    let { keyword, expire } = filters.toJS()
    let filteredCoupons = coupons.filter(m =>
      m.get('name').toLowerCase().indexOf(keyword) !== -1 &&
      (!expire || (m.get('expire') ? 'expired' : 'unexpired') === expire)
    )
    return filteredCoupons
  }
)

const selector = createStructuredSelector({
  name: x => x.getIn(['filters', 'name']),
  expire: x => x.getIn(['filters', 'expire']),
  page: x => x.get('page'),
  pageSize: x => x.get('pageSize'),
  results: createSelector(
    filteredCoupons,
    x => x.get('page'),
    x => x.get('pageSize'),
    (filteredCoupons, page, pageSize) => {
      return filteredCoupons.slice((page - 1) * pageSize, page * pageSize).toJS()
    }
  ),
  total: createSelector(
    filteredCoupons,
    filteredCoupons => filteredCoupons.size,
  ),
})

export default compose(
  Initable({
    loadFn: load,
    loadingFn: (state) => state.getIn(['layoutMgt', 'coupons', 'loading']),
    unloadFn: reset,
  }),
  connect(
    (state) => {
      const coupons = state.getIn(['layoutMgt', 'coupons'])
      return selector(coupons)
    },
    rest,
  ),
)(Coupons)
