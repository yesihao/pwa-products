import { fromTypes } from 'reax'

import actionTypes from '../actions/ActionTypes'

import stripKey from '../common/stripKey'
import { getWcApi } from '../apis'

const {
  loaded,
  ...rest
} = fromTypes(actionTypes, stripKey('PRODUCT_'))

function load(_, props) {
  return async (dispatch) => {
    const id = props.match.params.id
    try {
      const { body: product } = await getWcApi(`products/${id}`)
      dispatch(loaded(product))
    } catch (e) {
      alert('载入数据失败')
    }
  }
}

export default {
  ...rest,
  load,
}
