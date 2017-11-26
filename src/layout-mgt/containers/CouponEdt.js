import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router'
import { createStructuredSelector, createSelector } from 'reselect'
import { Initable } from 'reax'

import CouponEdt from '../components/CouponEdt'
import * as actions from '../actions/couponEdt'

const { load, ...rest } = actions

export const selector = createStructuredSelector({
  name: x => x.get('name'),
  value: x => x.get('value'),
  total: x => x.get('total'),
  limit: x => x.get('limit'),
  startTime: x => x.get('startTime'),
  endTime: x => x.get('endTime'),
  limitation: x => x.get('limitation'),
  minConsume: x => x.get('minConsume'),
  comment: x => x.get('comment'),
  file: createSelector(
    x => x.get('file'),
    file => file && file.toJS()
  ),
  disableSubmit: x => !x.validate(),
  status: x => x.get('status'),
})

export default withRouter(compose(
  Initable({
    loadFn: load,
    loadingFn: (state) => state.getIn(['layoutMgt', 'couponEdt', 'loading']),
  }),
  connect(
    (state) => {
      return selector(state.getIn(['layoutMgt', 'couponEdt']))
    },
    rest,
  ),
)(CouponEdt))
