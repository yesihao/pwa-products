import { fromTypes } from 'reax'

import actionTypes from '../../actions/ActionTypes'
import { notify } from '../../notify/actions'

import stripKey from '../../common/stripKey'
import getCoupons from '../apis/getCoupons'
import activateCoupon from '../apis/activateCoupon'

const {
  loaded,
  ...rest
} = fromTypes(actionTypes, stripKey('LAYOUT_MGT_COUPONS_'))

function load() {
  return async (dispatch) => {
    try {
      const resp = await getCoupons()
      const coupons = resp.result.coupons

      dispatch(loaded(coupons))
    } catch (e) {
      dispatch(notify('载入优惠券列表数据失败', 'danger'))
    }
  }
}

function activate(id, status) {
  return async (dispatch) => {
    let msg = status === 1 ? '开启领取优惠券' : '关闭领取优惠券'
    const to = confirm(`是否要${msg}`)
    if (to) {
      try {
        await activateCoupon(id, status)
        dispatch(notify(`${msg}成功`, 'info'))
        dispatch(load())
      } catch (e) {
        dispatch(notify(`${msg}失败`, 'danger'))
      }
    }
  }
}


export default {
  ...rest,
  load,
  activate,
}
