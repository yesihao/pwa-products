import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector, createSelector } from 'reselect'
import { Initable } from 'reax'

import Product from '../components/Product'
import actions from '../actions/product'

const { load, reset, ...rest } = actions

const selector = createStructuredSelector({
  name: x => x.get('name'),
  categories: x => x.get('categories').toJS(),
  image: createSelector(
    x => x.get('images'),
    x => x.getIn([0, 'src']),
  ),
  images: createSelector(
    x => x.get('images'),
    x => x.slice(1).toJS(),
  ),
  attributes: x => x.get('attributes').toJS(),
})

export default compose(
  Initable({
    loadFn: load,
    loadingFn: (state) => state.getIn(['product', 'loading']),
    unloadFn: reset,
  }),
  connect(
    (state) => {
      const product = state.get('product')
console.log(product.toJS())
      return selector(product)
    },
    rest,
  ),
)(Product)
