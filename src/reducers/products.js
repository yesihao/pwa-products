import I from 'immutable'

import { ha, keyedReducer } from 'reax'
import actionTypes from '../actions/ActionTypes'

const {
  PRODUCTS_LOADING,
  PRODUCTS_CATEGORIES_LOADED,
  PRODUCTS_PRODUCTS_LOADED,
  PRODUCTS_RESET,
  PRODUCTS_CATEGORIES_RESET,
  PRODUCTS_UPDATE_FILTER,
  PRODUCTS_PAGE_TO,
} = actionTypes

const INIT_FILTER = I.fromJS({
  brand: -1,
  model: -1,
})

const INIT_STATE = I.fromJS({
  loading: true,
  categories: null,
  products: null,
  page: 1,
  pageSize: 6,
  total: 0,
  filter: INIT_FILTER,
})

export default ha({
  [PRODUCTS_PRODUCTS_LOADED]: (state, action) => {
    let [ products, total ] = action.payload
    return state.set('products', I.fromJS(products)).set('total', total)
  },
  [PRODUCTS_CATEGORIES_LOADED]: keyedReducer('categories', x => I.fromJS(x)),
  [PRODUCTS_LOADING]: keyedReducer('loading'),
  [PRODUCTS_RESET]: () => INIT_STATE,
  [PRODUCTS_CATEGORIES_RESET]: keyedReducer('filter', () => INIT_FILTER),
  [PRODUCTS_UPDATE_FILTER]: keyedReducer((state, action) => ['filter'].concat([action.payload[0]]), x => x[1]),
  [PRODUCTS_PAGE_TO]: keyedReducer('page'),
}, INIT_STATE)
