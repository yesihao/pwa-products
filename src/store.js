import { createStore, applyMiddleware } from 'redux'
import I from 'immutable'
import thunkMiddleware from 'redux-thunk'

import rootReducer from './reducers'

const store = createStore(
  rootReducer,
  I.fromJS({}),
  applyMiddleware(thunkMiddleware)
)

export default store
