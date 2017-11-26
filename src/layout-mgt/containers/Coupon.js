import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router'
import { createStructuredSelector, createSelector } from 'reselect'
import { Initable } from 'reax'
import { formatDate } from 'tjs'

import Coupon from '../components/Coupon.js'
import actions from '../actions/coupon'

const { load, reset, ...rest } = actions

const selector = createStructuredSelector({
  name: x => x.get('name'),
  value: x => x.get('value'),
  total: x => x.get('total'),
  limit: x => x.get('limit'),
  startTime: createSelector(
    x => x.get('startTime'),
    t => formatDate(new Date(t * 1000), 'yyyy-MM-dd HH:mm:ss'),
  ),
  endTime: createSelector(
    x => x.get('endTime'),
    t => formatDate(new Date(t * 1000), 'yyyy-MM-dd HH:mm:ss'),
  ),
  updateTime: createSelector(
    x => x.get('updateTime'),
    t => formatDate(new Date(t * 1000), 'yyyy-MM-dd HH:mm:ss'),
  ),
  minConsume: x => x.get('minConsume') ,
  comment: x => x.get('comment'),
  status: x => x.get('status'),
  codePage: x => x.get('codePage'),
  codePageSize: x => x.get('codePageSize'),
  codeTotal: x => x.get('codeTotal'),
  codes: createSelector(
    x => x.get('codes'),
    codes => codes.map(c => {
      return c.withMutations(c => {
        c.update('drawTime', t => t ? formatDate(new Date(t * 1000), 'yyyy-MM-dd HH:mm:ss') : '-')
        c.update('usedTime', t => t ? formatDate(new Date(t * 1000), 'yyyy-MM-dd HH:mm:ss') : '-')
      })
    }).toJS()
  )
})

export default withRouter(compose(
  Initable({
    loadFn: load,
    loadingFn: (state) => state.getIn(['layoutMgt', 'coupon', 'loading']),
    unloadFn: reset,
  }),
  connect(
    (state) => {
      return selector(state.getIn(['layoutMgt', 'coupon']))
    },
    rest,
  ),
)(Coupon))
