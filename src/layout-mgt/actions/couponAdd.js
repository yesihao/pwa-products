import history from '../../history'

import { notify } from '../../notify/actions'
import {
  pickFile,
  clearFile,
  setFileErrorUrl,
  updateFields,
  reset,
} from './couponEdt'

import couponEdtErrHandler from '../common/couponEdtErrHandler'
import addCouponApi from '../apis/addCoupon'

function addCoupon() {
  return async (dispatch, getState) => {
    let coupon = getState().getIn(['layoutMgt', 'couponEdt'])

    if (!coupon.validateDate()) {
      dispatch(notify('优惠券可用起始时间必须早于结束时间',  'danger'))
      return
    }

    let toAdd = confirm('是否创建的优惠券')
    if (toAdd) {
      try {
        await addCouponApi(coupon.dump())
        dispatch(notify('创建优惠券成功', 'info'))
        history.push('/m/layoutmgt/coupons')
      } catch (e) {
        let ret
        if (e.result) {
          dispatch(setFileErrorUrl(e.result.url))
          ret = e.ret
        } else {
          ret = e
        }
        dispatch(notify(couponEdtErrHandler(ret, '创建'), 'danger'))
      }
    }
  }
}

export {
  pickFile,
  clearFile,
  updateFields,
  reset,
  addCoupon as submit,
}
