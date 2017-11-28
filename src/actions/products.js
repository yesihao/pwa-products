import { fromTypes } from 'reax'

import actionTypes from '../actions/ActionTypes'

import stripKey from '../common/stripKey'
import { getWcApi } from '../apis'

const {
  loading,
  categoriesLoaded,
  productsLoaded,
  pageTo,
  ...rest
} = fromTypes(actionTypes, stripKey('PRODUCTS_'))

function load() {
  return async (dispatch) => {
    try {
      let promises = [dispatch(loadCategories()), dispatch(loadProducts())]
      await Promise.all(promises)

      dispatch(loading(false))
    } catch (e) {
      // NOTE do nothing
    }
  }
}

function loadCategories() {
  return async (dispatch) => {
    try {
      const { body: categories } = await getWcApi('products/categories')
      dispatch(categoriesLoaded(categories))
      Promise.resolve(categories)
    } catch (e) {
      alert('载入数据失败')
      Promise.reject()
    }
  }
}

function loadProducts() {
  return async (dispatch, getState) => {
    const { model } = getState().getIn(['products', 'filter']).toJS()
    const { page, pageSize } = getState().get('products').toJS()

    let params = {
      page,
      per_page: pageSize,
    }
    if (model > 0) {
      params.category = model
    }

    try {
      const { body: products, headers } = await getWcApi('products', params)
      let total = +headers['x-wp-total']
      dispatch(productsLoaded(products, total))
      if (products.length <= 0 && page > 1) {
        dispatch(pageTo(page - 1))
        dispatch(loadProducts())
      }
      Promise.resolve(products)
    } catch (e) {
      alert('载入数据失败')
      Promise.reject()
    }
  }
}

function pageToAndReload (page) {
  return async (dispatch) => {
    dispatch(pageTo(page))
    dispatch(loadProducts())
  }
}

export default {
  ...rest,
  load,
  loadCategories,
  loadProducts,
  pageToAndReload,
}
