import { fromTypes } from 'reax'

import actionTypes from '../../actions/ActionTypes'
import { notify } from '../../notify/actions'

import stripKey from '../../common/stripKey'
import getCoupon from '../apis/getCoupon'
import getCouponCodes from '../apis/getCouponCodes'

const {
  loaded,
  codeLoaded,
  codePageTo: _codePageTo,
  ...rest
} = fromTypes(actionTypes, stripKey('LAYOUT_MGT_COUPON_VIEW_'))

function load(_, props) {
  return async (dispatch) => {
    const id = props.match.params.id

    try {
      let promises = [getCoupon(id), dispatch(loadCodes(id))]
      const resps = await Promise.all(promises)
      const coupon = resps[0].result

      dispatch(loaded(coupon))
    } catch (e) {
      dispatch(notify('载入优惠券数据失败', 'danger'))
    }
  }
}

function loadCodes(_id) {
  return async (dispatch, getState) => {
    const { id, codePage, codePageSize } = getState().getIn(['layoutMgt', 'coupon']).toJS()
    let couponId = _id || id
    let status_list = [2, 3, 4]

    const resp = await getCouponCodes(couponId, codePage, codePageSize, status_list)
    const { codes, total } = resp.result

    dispatch(codeLoaded(codes, total))
    return resp
  }
}

function codePageTo(codePage) {
  return async (dispatch) => {
    dispatch(_codePageTo(codePage))

    try {
      const resp = await dispatch(loadCodes())
      if (resp.result.codes.length <= 0 && codePage > 1) {
        dispatch(codePageTo(codePage - 1))
      }
    } catch (e) {
      dispatch(notify('载入优惠券列表数据失败', 'danger'))
    }
  }
}

export default {
  ...rest,
  load,
  codePageTo,
}
