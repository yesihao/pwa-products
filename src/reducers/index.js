import { combineReducers } from 'redux-immutablejs'

import products from './products'
import product from './product'

export default combineReducers({
  products,
  product,
})
