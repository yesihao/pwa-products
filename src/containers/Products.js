import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import { Initable } from 'reax'

import Products from '../components/Products'
import actions from '../actions/products'

const { load, reset, ...rest } = actions

const selector = createStructuredSelector({
  products: x => x.get('products').toJS(),
  page: x => x.get('page'),
  pageSize: x => x.get('pageSize'),
  total: x => x.get('total'),
})

export default compose(
  Initable({
    loadFn: load,
    loadingFn: (state) => state.getIn(['products', 'loading']),
    // unloadFn: reset,
  }),
  connect(
    (state) => {
      const products = state.get('products')
console.log(products.toJS())
      return selector(products)
    },
    rest,
  ),
)(Products)
