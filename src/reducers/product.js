import I from 'immutable'

import { ha, keyedReducer } from 'reax'
import actionTypes from '../actions/ActionTypes'

const {
  PRODUCT_LOADED,
  PRODUCT_RESET,
} = actionTypes

const INIT_STATE = I.fromJS({
  loading: true,
  name: '',
  categories: null,
  images: null,
  attributes: null
})

export default ha({
  [PRODUCT_LOADED]: (state, action) => I.fromJS(action.payload).set('loading', false),
  [PRODUCT_RESET]: () => INIT_STATE,
}, INIT_STATE)
