import { connect } from 'react-redux'
import { createStructuredSelector, createSelector } from 'reselect'

import Filter from '../components/Filter'
import actions from '../actions/products'

let { updateFilter, pageToAndReload } = actions

const selector = createStructuredSelector({
  brand: x => x.get('brand'),
  brands: (x, y) => y.filter(c => c.get('parent') === 0)
    .unshift({ id: '-1', name: '请选择'}).toJS(),
  model: x => x.get('model'),
  models: createSelector(
    x => x.get('brand'),
    (x, y) => y,
    (brand, cs) => cs.filter(c => c.get('parent') === brand)
      .unshift({ id: '-1', name: '请选择'}).toJS(),
  ),
})

export default connect(
  (state) => {
    const filter = state.getIn(['products', 'filter'])
    const categories = state.getIn(['products', 'categories'])
    return selector(filter, categories)
  },
  {
    updateFilter,
    pageToAndReload,
  },
)(Filter)
