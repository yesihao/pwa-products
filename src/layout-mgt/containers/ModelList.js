import { connect } from 'react-redux'
import { createSelector, createStructuredSelector } from 'reselect'

import ModelList from '../components/ModelList'
import actions from '../actions/layout'

const filteredModels = createSelector(
  x => x.get('models'),
  x => x.get('filters'),
  (models, filters) => {
    let filteredModels = models
    let { keyword, entrance, status, type } = filters.toJS()
    filteredModels = models
      .filter(m =>
        m.get('name').toLowerCase().indexOf(keyword) !== -1 &&
        (!entrance || m.get('entranceId') === entrance) &&
        (!status || m.get('status') === status) &&
        (!type || m.get('function') === type)
      )
    return filteredModels
  }
)
const order = createSelector(
  x => x.getIn(['filters', 'order']),
  order => order
)

const selector = createStructuredSelector({
  models: createSelector(
    filteredModels,
    x => x.get('page'),
    x => x.get('pageSize'),
    order,
    (filteredModels, page, pageSize, order) => {
      let models = filteredModels
      if (order) {
        models = models.sortBy(m => m.get(order.get('k')) * (order.get('v') === 'desc' ? -1 : 1))
      }
      return models.slice((page - 1) * pageSize, page * pageSize).toJS()
    }
  ),
  page: x => x.get('page'),
  pageSize: x => x.get('pageSize'),
  total: createSelector(
    filteredModels,
    filteredModels => filteredModels.size,
  ),
  order: createSelector(
    order,
    order => order && order.toJS()
  ),
})

export default connect(
  (state) => {
    const layout = state.getIn(['layoutMgt', 'layout'])
    return selector(layout)
  },
  actions,
)(ModelList)
